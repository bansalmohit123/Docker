const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose
  .connect("mongodb://mohit:mypassword@mongo:27017/?authSource=admin")
  .then(() => console.log("successfully connected to db"))
  .catch((e) => console.log(e));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("<h2> hi there!!!!!!</h2>");
});

app.listen(port, "0.0.0.0", () => console.log(`listening on port ${port}`));
