declare namespace Express {
    interface Request {
        user: User
    }
    interface ParsedQs {
        [field: string]: string

    }
}

interface JwtPayload { full_name: string, email: string, nickname: string, iat?: number, exp?: number }

interface SingleMod {
    amount: number | string
    source: "class" | "race" | "die" //???????????
  }
  interface Modifiers {
    [key: string]: SingleMod[]
    cha: SingleMod[]
    str: SingleMod[]
    con: SingleMod[]
    dex: SingleMod[]
    int: SingleMod[]
    wis: SingleMod[]
  }