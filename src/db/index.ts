//CONNECTION 
const mongoose = require('mongoose');
const server = require("../server")
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> server.listen(process.env.PORT, () => {
    console.log(
      "❗ Server is running on",
      process.env.PORT,
      " with these endpoints: ",
      endpoints(server)
    );
     }));

