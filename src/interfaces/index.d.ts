    declare namespace Express {
        interface Request {
            user: User
        }
        
    }

interface IQuery extends Express.ParsedQs, Record<string, string> {

}

interface JwtPayload {
    full_name: string
    email: string
    nickname: string
    iat?: number
    exp?: number
}

interface SingleMod {
    amount: number
    source: "class" | "race" | "die" //???????????
}
interface Modifiers {
    [key: string]: {
        mods: SingleMod[]
        total: number
    }
    cha: {
        mods: SingleMod[]
        total: number
    }
    str: {
        mods: SingleMod[]
        total: number
    }
    con: {
        mods: SingleMod[]
        total: number
    }
    dex: {
        mods: SingleMod[]
        total: number
    }
    int: {
        mods: SingleMod[]
        total: number
    }
    wis: {
        mods: SingleMod[]
        total: number
    }
}
