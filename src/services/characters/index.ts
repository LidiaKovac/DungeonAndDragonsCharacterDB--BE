//GENERAL
const characterRoute = require("express").Router()
import { Request, Response, NextFunction } from "express"
// import { validateCharacter } from "../../validation/char";
import Character from "../../db/models/character"
import Classes from "../../db/models/classes"
import Race from "../../db/models/races"
import Source from "../../db/models/sources"
import {
  abs,
  calculateProf,
  charAttributes,
  classAttributes,
  raceAttributes,
  getModifiers,
  findOneCharOptions,
  getSkills,
} from "../../utils"
import { authMidd } from "../../utils/auth"
import multer from "multer"
import Skill from "../../db/models/skills"
import { Op } from "sequelize"

characterRoute.get(
  "/",
  authMidd,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCharacters = await Character.findAll({
        where: {
          UserId: req.user.id,
        },
        attributes: charAttributes,
        include: [
          {
            model: Classes,
            attributes: classAttributes,
            include: [{ model: Source, attributes: ["name", "shorthand"] }],
          },
          {
            model: Race,
            attributes: raceAttributes,
            include: [{ model: Source, attributes: ["name", "shorthand"] }],
          },
        ],
      })
      res.send(allCharacters)
    } catch (e) {
      next(e)
    }
  }
)
characterRoute.get(
  "/:id",
  authMidd,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const selectedChars = await Character.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id,
        },
        ...findOneCharOptions
      },)
      if (!selectedChars) res.status(403).send("This is not your character!")
      else {
        const modifiers = await getModifiers(selectedChars)
        const { charWithProfs, skills } = await getSkills(selectedChars)
        res.send({ char: charWithProfs, modifiers, skills })
      }
    } catch (e) {
      next(e)
    }
  }
)
characterRoute.post(
  "/",
  [authMidd, multer().fields([{ name: "name" }, { name: "level" }])],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //created new char
      let char = await Character.create({
        ...req.body,
        UserId: req.user.id,
        RaceId: req.body.race,
        ClassId: req.body.classes,
      })
      //need to send back char with prof

      let charWithClass = await Character.findOne({
        where: { id: char.id },

        ...findOneCharOptions
      })

      const keysToCheck = ["prof_1", "prof_2", "prof_3", "prof_4"]
      for (const key of keysToCheck) {
        let abToChange = charWithClass?.getDataValue("Class").getDataValue(key)
        charWithClass?.update({
          [abToChange]:
            charWithClass[abToChange] || 0 + calculateProf(String(char.level)),
        })
        charWithClass?.update({
          skillProfLeft: charWithClass.Class.skillProfNum,
        })
        await charWithClass?.save()
      }
      for (const ab of abs) {
        charWithClass?.update({
          [ab]:
            Number(charWithClass[ab]) ||
            0 + Number(charWithClass?.getDataValue("Race").getDataValue(ab)),
        })
        await charWithClass?.save()
      }
      //   await charWithClass?.save()
      charWithClass?.reload()
      res.send(charWithClass)
    } catch (e) {
      next(e)
    }
  }
)

characterRoute.put(
  "/:id",
  [authMidd, multer().fields([{ name: "name" }, { name: "level" }, { name: "description" }])],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          if (abs.includes(key)) {
            req.body[key] = Number(req.body[key])
          }
        }
      }
      let edit = await Character.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
            UserId: req.user.id,
          },
        }
      )
      if (edit) {
        let updated = await Character.findByPk(req.params.id, findOneCharOptions)
        const skills = await Skill.findAll()
        let { charWithProfs: charWithSkills } = await getSkills(updated!)
        res.status(201).send({
          char: charWithSkills,
          modifiers: await getModifiers(updated!),
          skills,
        })
      } else {
        res.sendStatus(400)
      }
    } catch (e) {
      next(e)
    }
  }
)

characterRoute.put(
  "/:id/addSkill/:skillName",
  authMidd,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const charToEdit = await Character.findOne({
        where: {
          // UserId: req.user.id,
          id: req.params.id,
        },
        ...findOneCharOptions
      })
      if (!charToEdit) {
        res.status(404).send("User not found")
      } else if (charToEdit.UserId !== req.user.id) {
        res.status(403).send("This is not your user!")
      } else {
        if (charToEdit.skillProfLeft <= 0) {
          res.status(403).send("You cannot add any more profs")
        } else {

          const skill = await Skill.findOne({
            where: {
              name: req.params.skillName,
            },
          })
          if (charToEdit.Skill?.map((sk: Skill) => sk.name).includes(req.params.name)) {
            charToEdit.removeSkill(skill!.id)
            await Character.update(
              {
                skillProfLeft: charToEdit.skillProfLeft + 1,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
          } else {
            charToEdit.addSkill(skill!.id)

            await Character.update(
              {
                skillProfLeft: charToEdit.skillProfLeft - 1,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
          }

          const updated = await Character.findByPk(charToEdit.id, findOneCharOptions)
          delete updated!.Skills[0].CharSkill
          let { charWithProfs: charWithSkills } = await getSkills(updated!)
          res.status(201).send(charWithSkills)
        }
      }
    } catch (error) {
      next(error)
    }
  }
)

characterRoute.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (e) {
      next(e)
    }
  }
)

export default characterRoute
