import express from "express";
import { signup } from "../controllers/authController.js";
import { runValidation } from "../validators/index.js";
import { userSignupValidator } from "../validators/auth.js";

const router = express.Router();

//validation

router.post("/signup", userSignupValidator, runValidation, signup);

export default router;
