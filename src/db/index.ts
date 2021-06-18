//CONNECTION
const mongoose = require("mongoose");
const server = require("../server");
const endpoints = require("express-list-endpoints")
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    //useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        "❗ Server is running on",
        process.env.PORT,
        " with these endpoints: ",
        endpoints(server)
      );
    });
  })
  .catch((e: Error) => console.log(e));
