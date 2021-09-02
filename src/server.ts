const express = require('express')
require("dotenv").config()
const cors = require("cors")


const app = express()

const char_route = require("./services/characters")
const image_route = require("./services/image upload")
const user_route = require("./services/user")
const class_route = require("./services/dnd")

app.use(cors())
app.use(express.json())
app.use(require("helmet")())

app.use("/character", char_route)
app.use("/image", image_route)
app.use("/user", user_route)
app.use("/dnd", class_route)

module.exports = app