if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Inizaliciations
const app = express();
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// Routes
//app.use(require("./routes/books"));
app.use('/api/books', require('./routes/books'));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Start Server
app.listen(app.get("port"), () => {
  console.log("[Server] Port " + app.get("port"));
});
