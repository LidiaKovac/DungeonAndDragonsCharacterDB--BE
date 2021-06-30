const image_route = require("express").Router();

//CLOUDINARY 
import multer from "multer";
const cloudinary = require("../../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dndMoodboard",
  },
});
const cloudinaryMulter = multer({ storage: storage });

//INTERFACES
import { Response, NextFunction } from "express";
import { RequestWithFile } from "../../interfaces/requests";


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
