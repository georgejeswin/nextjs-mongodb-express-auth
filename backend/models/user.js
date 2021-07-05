import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: Number,
    about: {
      type: String,
    },
    role: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      data: Buffer,
    },
    resetPasswordlink: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
