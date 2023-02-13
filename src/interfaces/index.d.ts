declare namespace Express {
    interface Request {
        user: User
    }
    interface ParsedQs {
        [field: string]: string

    }
}