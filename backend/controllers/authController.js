import UserModel from "../models/user.js";
import shortId from "shortid";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const signup = async (req, res) => {
  UserModel.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const { name, email, password } = req.body;
    let username = await shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = await new UserModel({
      username,
      name,
      email,
      password,
      profile,
    });
    await newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "signup success please sign in",
      });
    });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;

  //check user exists
  UserModel.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "email does not exist, please sign up" });
    }

    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Email and password doesnt match" });
    }
    //generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout successful",
  });
};

// export const requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
// });
