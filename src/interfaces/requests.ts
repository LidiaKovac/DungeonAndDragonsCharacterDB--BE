
import {User} from "./models"
import {Cloudinary_file} from "./index"
import { Request } from "express"
export interface RequestWithFile extends Request {
    file: Cloudinary_file
}

export interface RequestWithUser extends RequestWithFile {
    user: User
}

export class ImageRequestBody {
    file: File
    text: string
    constructor(file:File, text:string) {
        this.file = file
        this.text = text
    }
}