const image_route = require("express").Router();
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { RequestWithFile } from "../../interfaces";
const cloudinary = require("../../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dndMoodboard",
  },
});
const cloudinaryMulter = multer({ storage: storage });
image_route.post( //very simple route, only returns the uploaded string
  "/generate",
  cloudinaryMulter.single("moodboard"),
  async (req: RequestWithFile, res: Response, next: NextFunction) => {
    try {
      res.send({ img: req.file.path });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = image_route;
