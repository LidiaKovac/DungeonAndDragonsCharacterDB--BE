//GENERAL
const characterRoute = require("express").Router();
import { Request, Response, NextFunction } from "express";
// import { validateCharacter } from "../../validation/char";
import Character from "../../db/models/character";
import Classes from "../../db/models/classes";
import Race from "../../db/models/races";
import Source from "../../db/models/sources";
import { calculateProf } from "../../utils";

characterRoute.get(
	"/",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const allCharacters = await Character.findAll({
				include: {
					model: Classes,
					attributes: ["type", "name", "spellAbility"],
					include: [{ model: Source, attributes: ["name", "shorthand"] }]
				},
			})
			res.send(allCharacters)
		} catch (e) {
			next(e);
		}
	}
);
characterRoute.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const selectedChars = await Character.findByPk(req.params.id, {
				include: {
					model: Classes,
					attributes: ["type", "name", "spellAbility"],
					include: [{ model: Source, attributes: ["name", "shorthand"] }]
				}
			})

			res.send(selectedChars)
		} catch (e) {
			next(e);
		}
	}
);
characterRoute.post(
	"/",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			//body strucutre: 
			//lvl, race, class, name
			let char = await Character.create(req.body, {
				include: [Classes]
			})
			// req.body.classes
			for (const classId of req.body.classes) {
				let classFound = await Classes.findByPk(classId)
				const keysToCheck = ["prof_1", "prof_2", "prof_3", "prof_4"]
				for (const key in classFound!.toJSON()) {
					console.log(key);

					if (Object.prototype.hasOwnProperty.call(classFound?.toJSON(), key) && keysToCheck.includes(key)) {
						const skill = classFound![key as keyof Classes] as string;
						console.log(skill);

						await char.update({
							[skill]: calculateProf(char.level as number)
						})
						await char.save()
					}
				}
				char.addClass(classFound, { through: "ClassChar" })
				console.log(char);

			}
			// await char.save()
			res.send(char)
		} catch (e) {
			next(e);
		}
	}
);
characterRoute.put(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
		} catch (e) {
			next(e);
		}
	}
);
characterRoute.delete(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
		} catch (e) {
			next(e);
		}
	}
);

export default characterRoute