//GENERAL
import { Router } from "express"
const userRoute = Router()
import { Request, Response, NextFunction } from "express"
// import { validateCharacter } from "../../validation/char";
import { compare, hash } from "bcryptjs"
import User from "../../db/models/user"
import { calculateProf } from "../../utils"
import { authMidd, generateJWT } from "../../utils/auth"
import multer from "multer"
const { SALT } = process.env
//admin middleware
userRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCharacters = await User.findAll()
      res.send(allCharacters)
    } catch (e) {
      next(e)
    }
  }
)
userRoute.get(
  "/me",
  authMidd,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.user)
    } catch (error) {
      next(error)
    }
  }
)

userRoute.post(
  "/login",
  async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      let foundUser = await User.findOne({
        where: {
          email: body.email,
        },
      })
      if (foundUser && (await compare(body.password, foundUser.password))) {
        const token = await generateJWT({
          full_name: foundUser!.full_name,
          email: foundUser!.email,
          nickname: foundUser!.nickname,
        })
        res
          .set("Access-Control-Expose-Headers", "token")
          .set("token", token as string)
          .send(200)
      } else res.send(404)
    } catch (error) {
      next(error)
    }
  }
)

userRoute.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const selectedUser = await User.findByPk(req.params.id)
      res.send(selectedUser)
    } catch (e) {
      next(e)
    }
  }
)

userRoute.post(
  "/",
  multer().fields([
    { name: "full_name" },
    { name: "email" },
    { name: "nickname" },
    { name: "password" },
    { name: "password_confirm" },
  ]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.body.password !== req.body.password_confirm)
        res.status(400).send("Passwords don't match!")
      const checkUnique = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if(checkUnique) {
        res.status(400).send("Email is already in our system!")
      }
      const { full_name, email, nickname } = await User.create({
        ...req.body,
        password: await hash(req.body.password, SALT!),
      })
      // const token = await generateJWT({ full_name, email, nickname })
      res.status(201).send("User created")
    } catch (e) {
      next(e)
    }
  }
)

userRoute.post("/logout", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
  } catch (e) {
    next(e)
  }
})


userRoute.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (e) {
      next(e)
    }
  }
)
userRoute.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (e) {
      next(e)
    }
  }
)

export default userRoute
