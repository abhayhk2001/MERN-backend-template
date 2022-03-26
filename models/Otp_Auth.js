import mongoose from "mongoose";

const Otp_AutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    otp: { type: String, required: true },
  },
  {
    expireAfterSeconds: 60,
  }
);

export const Otp_AuthSchema =
  mongoose.models.Otp_AuthSchema ||
  mongoose.model("Otp_AuthSchema", Otp_AutSchema);

export const findOne = async (query) => await Otp_AuthSchema.findOne(query);

export const find = async (query) => await Otp_AuthSchema.find(query);

export const insertOne = async (data) => {
  let newOtpAuth = new Otp_AuthSchema(data);

  await newOtpAuth.save();
  return newOtpAuth;
};

export const deleteOne = async (query) => await Otp_AuthSchema.remove(query);

export const updateOne = async (query, data) => {
  const user = await Otp_AuthSchema.findOneAndUpdate(query, data, {
    returnOriginal: false,
  });
  return user;
};

export const upsertOne = async (query, data) => {
  const user = await Otp_AuthSchema.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  });
  return user;
};

export const findByUid = async (uid) => await Otp_AuthSchema.findOne({ uid });
