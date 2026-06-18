import { body } from "express-validator";

// Req-body input validation
export const userRegisterInputRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    // REVIEW FIX: 4 chars is too weak. Raised minimum to 6 characters.
    .isLength({ min: 6 })
    .withMessage("password must contain at least 6 characters"),
];

export const userLoginInputRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format"),

  body("password").notEmpty().withMessage("password is required"),
];
