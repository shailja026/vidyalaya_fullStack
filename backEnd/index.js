const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const routes = require('./routes/routes')
app.use(cors());
app.use(express.json());
app.use(multer().any());


// mongoodb connection============================================================

const connectionString = "mongodb+srv://shailjagupta4466:YLrsPDEkfI9uTG9f@cluster0.0fuq2gi.mongodb.net/vidhyaFullStack2";
const Port = 7000;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("error in to database connecting!!"));

app.use('/', routes)

app.get("/" ,(req , res) => {
  res.send("ready to go")
})
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
