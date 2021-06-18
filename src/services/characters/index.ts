//GENERAL
const character_route = require("express").Router();
import { Request, Response, NextFunction } from "express";
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
	   res.send(200)
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
