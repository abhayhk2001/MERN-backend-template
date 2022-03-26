import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    default: "",
    required: true,
    unique: true,
    index: true,
  },
  photoURL: {
    type: String,
    default: "",
  },
  verified: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ["Athlete", "Staff"],
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const findOne = async (query) => await User.findOne(query);

export const find = async (query) => await User.find(query);

export const insertOne = async (data) => {
  let newUser = new User(data);

  await newUser.save();
  return newUser;
};

export const deleteOne = async (query) => await User.remove(query);

export const updateOne = async (query, data) => {
  const user = await User.findOneAndUpdate(query, data, {
    returnOriginal: false,
  });
  return user;
};

export const upsertOne = async (query, data) => {
  const user = await User.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  });
  return user;
};

export const findByUid = async (uid) => await User.findOne({ uid });
