import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

import { SESS_NAME } from "./helpers/utils.js";
import "./helpers/dbConnection.js";

const app = express();
const IN_PROD = process.env.NODE_ENV === "production";

// MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.APP_URL],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(
  session({
    name: SESS_NAME,
    cookie: {
      httpOnly: true,
      sameSite: true,
      secure: IN_PROD,
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.GOD_SECRET,
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  res.send("Welcome");
});

// INITIALIZE EXPRESS PORT AND LISTEN
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) console.log("Error in running express : " + err);
  else console.log("Server running on port : " + port);
});
