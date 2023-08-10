const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const grocery = require("./routes/grocery");

app.use(express.json());
app.use(cors());

app.use("/api/v1/items", grocery);
const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("listening..."));
  } catch (error) {
    console.log(error);
  }
};

start();
