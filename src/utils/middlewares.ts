import { NextFunction, Request, Response } from "express"
import { RequestWithUser } from "../interfaces/requests"
const bcrypt = require("bcrypt")
const userModel = require("../services/user/user")

export const authenticate = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        let foundUser = await userModel.findOne({email: req.body.email})
        if (foundUser?._id) {
            let isCorrect:Boolean = bcrypt.compare(req.body.password, foundUser.password)
            if (isCorrect) {
                req.user = {email: foundUser.email, username: foundUser.username }
                next()
            }
        } else res.sendStatus(401)
        
    } catch (error) {
        
    }
}