//Import the mongoose module
import pkg from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { connect, connection } = pkg;

//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
  console.log("MongoDB Connected")
);

//Get the default connection
var db = connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
