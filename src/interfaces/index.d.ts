declare namespace Express {
    interface Request {
        user: User
    }
    interface ParsedQs {
        [field: string]: string

    }
}

interface JwtPayload { full_name: string, email: string, nickname: string, iat?: number, exp?: number }