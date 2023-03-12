//GENERAL
const characterRoute = require("express").Router()
import { Request, Response, NextFunction } from "express"
// import { validateCharacter } from "../../validation/char";
import Character from "../../db/models/character"
import Classes from "../../db/models/classes"
import Race from "../../db/models/races"
import Source from "../../db/models/sources"
import { abs, calculateProf } from "../../utils"
import { authMidd } from "../../utils/auth"
import multer from "multer"

characterRoute.get(
	"/",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const allCharacters = await Character.findAll({
				include: {
					model: Classes,
					attributes: ["type", "name", "spellAbility"],
					include: [{ model: Source, attributes: ["name", "shorthand"] }],
				},
			})
			res.send(allCharacters)
		} catch (e) {
			next(e)
		}
	}
)
characterRoute.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const selectedChars = await Character.findByPk(req.params.id, {
				include: {
					model: Classes,
					attributes: ["type", "name", "spellAbility"],
					include: [{ model: Source, attributes: ["name", "shorthand"] }],
				},
			})

			res.send(selectedChars)
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

				attributes: [
					"ab_prof_1",
					"ab_prof_2",
					"ab_prof_3",
					"ab_prof_4",
					...abs,
					"hit_points",
					"id",
					"name",
					"level",
				],
				include: [
					{ model: Race, attributes: ["id", "name", "source_name", ...abs] },
					{
						model: Classes,
						attributes: [
							"id",
							"name",
							"source_name",
							"hit_die",
							"skillProfNum",
							"skillProf",
							"weaponProf",
							"armorProf",
							"prof_1",
							"prof_2",
							"prof_3",
							"prof_4",
						],
					},
				],
			})

			const keysToCheck = ["prof_1", "prof_2", "prof_3", "prof_4"]
			for (const key of keysToCheck) {
				let abToChange = charWithClass?.getDataValue("Class").getDataValue(key)
				charWithClass?.update({
					[abToChange]:
						charWithClass[abToChange] || 0 + calculateProf(String(char.level)),
				})
				await charWithClass?.save()

			}
			for (const ab of abs) {
				console.log(
					(charWithClass![ab] as number) || 0,
					charWithClass?.getDataValue("Race").getDataValue(ab)
				)

				charWithClass?.update({
					[ab]:
						Number(charWithClass[ab]) || 0 +
						Number(
							charWithClass?.getDataValue("Race").getDataValue(ab)),
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
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
		} catch (e) {
			next(e)
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
