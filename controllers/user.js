import { statusCode } from "../helpers/constants";
import * as User from "../models/User";
import * as OtpAuth from "../models/Otp_Auth";

export const registerUser = (body) =>
  new Promise(async (resolve, reject) => {
    const { name, phone, uid, type } = body;

    if (!name || !phone || !uid || !type) {
      return reject({
        status: statusCode.InvalidData,
        data: { message: "Bad Request" },
      });
    }

    try {
      await User.insertOne(body);
    } catch (err) {
      console.log(err);
      return reject({
        status: statusCode.InternalServerError,
        data: { message: "Internal Server Error" },
      });
    }

    resolve({ status: statusCode.Success });

    // Send OTP
  });

export const verifyOTP = (body) =>
  new Promise(async (resolve, reject) => {
    const { phone, otp } = body;

    if (!phone || !otp) {
      return reject({
        status: statusCode.InvalidData,
        data: { message: "Bad Request" },
      });
    }

    try {
      let user = await User.findOne({ phone });

      if (!user) return resolve({ status: statusCode.NotFound });

      let otpAuth = await OtpAuth.findOne({ userId: user._id });

      if (otpAuth?.otp !== otp)
        return reject({ status: statusCode.Unauthorized });

      let [updatedUser] = await Promise.all([
        User.updateOne({ _id: user._id }, { verified: true }),
        OtpAuth.deleteOne({ userId: user._id }),
      ]);

      return resolve({ status: statusCode.Success, data: updatedUser });
    } catch (err) {
      console.log(err);
      return reject({
        status: statusCode.InternalServerError,
        data: { message: "Internal Server Error" },
      });
    }

    resolve({ status: statusCode.Success });
  });

export const loginUser = (body) =>
  new Promise(async (resolve, reject) => {
    const { phone } = body;

    if (!phone) {
      return reject({
        status: statusCode.InvalidData,
        data: { message: "Bad Request" },
      });
    }

    try {
      let user = await User.findOne({ phone });
      if (!user) return resolve({ status: statusCode.NotFound });
    } catch (err) {
      console.log(err);
      return reject({
        status: statusCode.InternalServerError,
        data: { message: "Internal Server Error" },
      });
    }

    resolve({ status: statusCode.Success });

    // Send Otp
  });
