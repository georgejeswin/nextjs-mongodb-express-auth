import { check } from "express-validator";

export const userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Enter a valid Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];
