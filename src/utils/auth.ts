import { NextFunction, Request, Response } from "express"
import { sign, verify } from "jsonwebtoken"
import User from "../db/models/user"
const { JWT_SECRET } = process.env
export const generateJWT = (payload: JwtPayload) => {
    return new Promise((res, rej) => sign(payload, JWT_SECRET!, { expiresIn: "5 min" }, (err, token) => {
        if (err) res(err)
        else res(token)
    }))
}

export const verifyJWT = (token: string): Promise<JwtPayload | Error> => {
    return new Promise((res, rej) => verify(token, JWT_SECRET!, (err, decoded) => {
        if (err) res(err)
        else res(decoded as JwtPayload)
    }))
}

export const authMidd = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) res.status(401).send("please send token :(")
    else {
        const decoded = await verifyJWT(req.headers["authorization"].replace("Bearer ", "")) as JwtPayload
        if (decoded.exp) {
            //if there is a token (otherwise it's an error)
            delete decoded.iat
            delete decoded.exp
            const me = await User.findOne({
                where: {
                    ...decoded
                },
                attributes: ["email", "full_name", "nickname", "id"]

            })
            if (me) {
                req.user = me
                next()
            } else res.status(401).send("user is not found :(")
        } else res.status(401).send("token expired or wrong")
    }
}