import {Request} from "express"

export interface Character {
    name: string
    isIdea: boolean
    moodboard: Array<string>
    bg: string
}

export class Response {
    status: number;
    text: string;

    constructor(status:number, text:string) {
        this.status = status
        this.text = text
    }
}
interface Cloudinary_file extends Express.Multer.File {
    filename: string;
    path: string;
    size: number
}
export interface RequestWithFile extends Request {
    file: Cloudinary_file
}

export class ImageRequestBody {
    file: File
    text: string
    constructor(file:File, text:string) {
        this.file = file
        this.text = text
    }
}

