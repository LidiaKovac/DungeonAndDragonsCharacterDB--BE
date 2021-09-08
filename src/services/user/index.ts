const userRoute = require("express").Router()

import { authenticate } from "../../utils/middlewares"

import {Request, Response, NextFunction} from "express"
import { RequestWithUser } from "../../interfaces/requests"
const userModel = require("./user")

userRoute.post("/register", async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        //console.log(req.body)
        let newUser = await new userModel(req.body)
        await newUser.save()
        console.log("user with IP: ", req.ip, "logged in as: ", newUser)
        res.send(newUser)
    } catch (error) {
        next(error)
    }
})

userRoute.post("/login", authenticate, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void>=> {
    try {
        //console.log(req.user)
        if (req.user) {
            console.log("user with IP: ", req.ip, "logged in as: ", req.user)
            res.send(req.user)
        } else res.send({isLogged: false})
    } catch (error) {
        next(error)
    }
})


userRoute.put("/edit/me", async()=> {

})
module.exports = userRoute