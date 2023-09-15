import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config();

export const cloudinaryMulter = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            ["allowed_formats" as keyof UploadApiOptions]: ["png", "jpg", "gif"],
            ["folder" as keyof UploadApiOptions]: "dnd",
        }
    })
})