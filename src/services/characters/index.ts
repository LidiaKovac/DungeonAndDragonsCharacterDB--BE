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
import { cloudinaryMulter } from "../../utils/cloudinary"
import Inspo from "../../db/models/inspo"

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
        if (!selectedChars.Class || !selectedChars.Race) res.send({ char: selectedChars })
        else {
          const modifiers = await getModifiers(selectedChars)
          const { charWithProfs, skills } = await getSkills(selectedChars)
          charWithProfs.prof = calculateProf(charWithProfs.level.toString())
          res.send({ char: charWithProfs, modifiers, skills })
        }
      }
    } catch (e) {
      next(e)
    }
  }
)
characterRoute.post(
  "/",
  [authMidd, cloudinaryMulter.array("inspo")],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //created new char
      let char = await Character.create({
        ...req.body,
        UserId: req.user.id,
      })
      for (const file of req.files as Express.Multer.File[]) {
        await Inspo.create({ url: file.path, CharId: char.id })
      }
      //need to send back char with prof

      let charWithInspo = await Character.findOne({
        where: { id: char.id },
        ...findOneCharOptions
      })

      // const keysToCheck = ["prof_1", "prof_2", "prof_3", "prof_4"]
      // for (const key of keysToCheck) {
      //   let abToChange = charWithClass?.getDataValue("Class").getDataValue(key)
      //   charWithClass?.update({
      //     [abToChange]:
      //       charWithClass[abToChange] || 0 + calculateProf(String(char.level)),
      //   })
      //   charWithClass?.update({
      //     skillProfLeft: charWithClass.Class.skillProfNum,
      //   })
      //   await charWithClass?.save()
      // }
      // for (const ab of abs) {
      //   charWithClass?.update({
      //     [ab]:
      //       Number(charWithClass[ab]) ||
      //       0 + Number(charWithClass?.getDataValue("Race").getDataValue(ab)),
      //   })
      //   await charWithClass?.save()
      // }
      // //   await charWithClass?.save()
      // charWithClass?.reload()
      res.send(charWithInspo)
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

        },

      )
      let updated = await Character.findByPk(req.params.id, findOneCharOptions)
      if (edit && updated?.Class && updated.Race) {
        const skills = await Skill.findAll()
        let { charWithProfs: charWithSkills } = await getSkills(updated!)
        charWithSkills.prof = calculateProf(charWithSkills.level.toString())

        res.status(201).send({
          char: charWithSkills,
          modifiers: await getModifiers(updated!),
          skills,
        })
      } else {
        res.send({ char: updated })
      }
    } catch (e) {
      next(e)
    }
  }
)

characterRoute.put(
  "/:id/skills/:skillName",
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
        const skill = await Skill.findOne({
          where: {
            name: req.params.skillName,
          },
        })
        if (skill && charToEdit.Skills?.map((sk: Skill) => sk.name).includes(skill.name)) {
          charToEdit.removeSkill(skill!.id)
          await Character.update(
            {
              skillProfLeft: Number(charToEdit.skillProfLeft) + 1,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
        } else {
          if (charToEdit.skillProfLeft <= 0) {
            res.status(400).send("You cannot add any more profs")
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


        }
        const updated = await Character.findByPk(charToEdit.id, findOneCharOptions)
        delete updated!.Skills[0].CharSkill
        let { charWithProfs: charWithSkills, skills } = await getSkills(updated!)
        const modifiers = await getModifiers(charWithSkills)
        charWithSkills.prof = calculateProf(charWithSkills.level.toString())
        res.send({ char: charWithSkills, modifiers, skills })
      }
    } catch (error) {
      next(error)
    }
  }
)

characterRoute.put("/:id/inspo/:inspoId", authMidd, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inspo = await Inspo.findOne({
      where: {
        CharId: req.params.id,
        id: req.params.inspoId
      },
    })
    if (inspo) {
      await inspo.update(req.body)
      await inspo.save()
      res.send(inspo)
    } else {
      res.send({ message: "not found" })
    }
  } catch (error) {
    next(error)
  }
})

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
