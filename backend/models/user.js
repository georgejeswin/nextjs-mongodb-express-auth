import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    username: {
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
    salt: String,
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

userSchema
  .virtual("password")
  .set(function (password) {
    //create a temp varialble called _password
    this._password = password;

    //generate salt
    this.salt = this.makesalt();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makesalt: function () {
    return Math.round(new Date().valueOf * Math.random()) + "";
  },
};

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
