const classRoute = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../interfaces";
import { authenticate } from "../../utils/middlewares";
import axios from "axios";

classRoute.get("/classes", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    axios({
      method: "get",
      url: "https://www.dnd5eapi.co/api/classes",
    }).then((classes) => res.send(classes.data.results));
  } catch (error) {
    next(error);
  }
});

classRoute.get("/races", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    axios({
      method: "get",
      url: "https://www.dnd5eapi.co/api/races",
    }).then((races) => res.send(races.data.results));
  } catch (error) {
    next(error);
  }
});

module.exports = classRoute;
