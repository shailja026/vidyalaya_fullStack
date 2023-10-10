// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const pdf = require("./models/pdf");
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// app.use("/files", express.static("files"));

// const Port = 7000;

// //mongodb connection----------------------------------------------
// const mongoUrl = "mongodb+srv://shailjagupta4466:YLrsPDEkfI9uTG9f@cluster0.0fuq2gi.mongodb.net/vidhyaFullStack2";


// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connected"))
//   .catch(() => console.log("error connecting "));

  
// // app.use("/", routes)
// //multer------------------------------------------------------------

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/newPdf.js");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// // require("./models/pdf");
// const PdfSchema = mongoose.model("pdf");
// const upload = multer({ storage: storage });


// // post api --------------------------------
// app.post("/uploadPdf", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   const title = req.body.title;
//   const fileName = req.file.filename;
//   try {
//     await PdfSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });



// // get api==========================================================================

// app.get("/getPdf", async (req, res) => {
//   try {
//     PdfSchema.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });

// //apis----------------------------------------------------------------


// app.get("/", async (req, res) => {
//   res.send("Success!!!!!!");
// });


// app.listen(Port, () => {
//   console.log("Server Started");
// });
