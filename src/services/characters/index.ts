//GENERAL
const characterRoute = require("express").Router();
import { Request, Response, NextFunction } from "express";
// import { validateCharacter } from "../../validation/char";
import Character from "../../db/models/character";
import Classes from "../../db/models/classes";
import Race from "../../db/models/races";

characterRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
	const allCharacters = await Character.findAll()
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
		const selectedChars = await Character.findByPk(req.params.id)
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
			include: [{model:Classes, as:"classes"}, {model:Race, as:"race"}]
		})
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