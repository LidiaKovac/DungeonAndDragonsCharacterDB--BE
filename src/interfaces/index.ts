export class Response {
    status: number;
    text: string;

    constructor(status:number, text:string) {
        this.status = status
        this.text = text
    }
}

export interface Cloudinary_file extends Express.Multer.File {
    filename: string;
    path: string;
    size: number
}



