import { Router } from "express";
const router = Router();
import constants from "../helpers/constants";
const {
  userTypes: { ADMIN },
} = constants;
import auth from "../middlewares/auth";
import * as User from "../controllers/user";

router.post("/register", auth(false), (req, res) => {
  User.registerUser(req.body)
    .then((result) => res.status(result.status).json(result.data))
    .catch((result) => res.status(result.status).json(result));
});

router.post("/verify-otp", auth(false), (req, res) => {
  User.verifyOTP(req.body)
    .then((result) => {
      req.session.auth = result.data._id;

      return res.status(result.status).json(result.data);
    })
    .catch((result) => res.status(result.status).json(result));
});

router.post("/login", auth(false), (req, res) => {
  User.loginUser(req.body)
    .then((result) => res.status(result.status).json(result.data))
    .catch((result) => res.status(result.status).json(result));
});
