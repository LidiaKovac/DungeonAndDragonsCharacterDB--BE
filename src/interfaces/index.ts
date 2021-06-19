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