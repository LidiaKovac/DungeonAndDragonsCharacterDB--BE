//GENERAL
const character_route = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { validateCharacter } from "../../validation/char";
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
	  const allCharacters = await charModel.find()
	   res.send(allCharacters)
	  } catch (e) {
		next(e);
	  }
	}
  );
character_route.post(
	"/",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	  try {
	let validationResult = validateCharacter(req.body)
	if (validationResult?.status !== 201) { //if validation fails
		res.status(validationResult?.status!).send(validationResult)
	} else {
		const newChar = await new charModel(req.body)
		res.send(newChar)
	}
	//const newChar = new charModel(req.body)
	   //res.send(200)
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
