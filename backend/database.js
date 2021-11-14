const mongoose = require("mongoose");

let database = process.env.MONGODB_URI;


mongoose.connect(database, {
    useNewUrlParser: true,
  })
  .then((db) => console.log("[MONGODB] DB is connected"))
  .catch((err) => console.error(err));
