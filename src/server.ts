import express from "express"
import { config } from "dotenv"
import endpoints from "express-list-endpoints"
import cors from "cors"
config()
import { sequelize } from "./db/index"
const PORT = process.env.PORT || 3001

const app = express()

import passive_data from "./services/dnd_data/index"
import characterRoute from "./services/characters"

app.use(express.json())
app.use(cors())
app.use(require("helmet")())

app.use("/passive", passive_data)
app.use("/api/character", characterRoute)

sequelize.sync({ force: false, logging: false, alter: true }).then((result: any) => {
    app.listen(PORT, () => {
        console.log(
            "🌚🌝 Server is running on",
            PORT,
            " with these endpoints: ",
            endpoints(app)
        );
    });
});
export default app