const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("connected");
};

module.exports = connectDB;
