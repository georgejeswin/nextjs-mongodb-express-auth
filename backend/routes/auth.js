import express from "express";
import {
  //   requireSignin,
  signin,
  signout,
  signup,
} from "../controllers/authController.js";
import { runValidation } from "../validators/index.js";
import {
  userSigninValidator,
  userSignupValidator,
} from "../validators/auth.js";

const router = express.Router();

//validation

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
// router.get("/secret", requireSignin, (req, res) => {
//   res.json({
//     message: "secret page",
//   });
// });

export default router;
