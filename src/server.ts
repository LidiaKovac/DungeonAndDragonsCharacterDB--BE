const express = require('express')
require("dotenv").config()
const cors = require("cors")
const endpoints = require("express-list-endpoints")

const app = express()

const char_route = require("./services/characters")

app.use(cors())
app.use(express.json())
app.use(require("helmet")())

app.use("/character", char_route)
app.listen(process.env.PORT, () => {
    console.log(
      "❗ Server is running on",
      process.env.PORT,
      " with these endpoints: ",
      endpoints(app)
    );
  });

module.exports = app