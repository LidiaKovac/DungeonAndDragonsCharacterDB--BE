import express from "express"
import { config } from "dotenv"
import endpoints from "express-list-endpoints"
import cors from "cors"
config()
import { sequelize } from "./db/index"
const PORT = process.env.PORT || 3002

const app = express()

import passive_data from "./services/dnd_data/index"
import characterRoute from "./services/characters"
import userRoute from "./services/users"

app.use(cors())
app.use(express.json())

// app.use(require("helmet")())
// app.options('*', cors({
//     exposedHeaders: "token",
//     origin: ["https://heartfelt-pasca-9ed41e.netlify.app", "http://localhost:3000"]
// }))
app.use("/passive", passive_data)
app.use("/api/character", characterRoute)
app.use("/api/user", userRoute)

const initAPI = async () => {
    try {

        console.log("Starting the server...")
        console.log("Connecting to DB...")
        await sequelize.sync({ force: false, logging: false, alter: false })
        app.listen(PORT, () => {
            console.log(
                "🌚🌝 Server is running on",
                PORT,
                " with these endpoints: ",
            );
            console.table(endpoints(app))
        })
    } catch (error) {
        console.error(error)
    }
}

initAPI()

export default app