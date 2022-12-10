import {Sequelize} from "sequelize"
import {config} from "dotenv"
import { initRelations } from "./relations"
import Character from "./models/character"
import Classes from "./models/classes"
import Race from "./models/races"
import User from "./models/user"
import Source from "./models/sources"
import RacialTrait from "./models/racial_feat"

config()
const {SQL_URI} = process.env as {[key:string]: string}


export const sequelize = new Sequelize(SQL_URI, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			required: true,
			rejectUnauthorized: false,
		},
	},
})

let models = [Character, Classes, Race, User, Source, RacialTrait]
models.forEach((model) => {
	model.initialize(sequelize)
})

initRelations()



