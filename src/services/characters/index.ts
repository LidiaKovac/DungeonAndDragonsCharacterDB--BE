//GENERAL
const character_route = require("express").Router();
import { Request, Response, NextFunction } from "express";
// import { validateCharacter } from "../../validation/char";
const charModel = require("./character")
character_route.get(
  "/me",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
	const allCharacters = await charModel.find()
     res.send(allCharacters)
    } catch (e) {
      next(e);
    }
  }
);
character_route.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	  try {
		const selectedChars = await charModel.findById(req.params.id)
		res.send(selectedChars)
	  } catch (e) {
		next(e);
	  }
	}
  );
character_route.post(
	"/",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	  try {
		console.log(req.body)
		// let validationResult = validateCharacter(req.body)
		// if (validationResult?.status !== 201) {
		// 	res.status(validationResult?.status!).send(validationResult)
		// }
		const newChar = new charModel(req.body)
		const {_id} = await newChar.save()
	   	res.status(200).send(_id)
	  } catch (e) {
		next(e);
	  }
	}
  );
  character_route.put(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	  try {
	   res.send(200)
	  } catch (e) {
		next(e);
	  }
	}
  );
  character_route.delete(
	"/:id",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	  try {
	   res.send(200)
	  } catch (e) {
		next(e);
	  }
	}
  );
module.exports = character_route;
