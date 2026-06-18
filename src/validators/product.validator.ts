import { body } from "express-validator";
import { ProductCategory } from "../models/product.model.js";

export const productFieldRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    // REVIEW FIX: 25 chars is too short for real product names. Raised to 100.
    .isLength({ max: 100 })
    .withMessage("name must be under 100 characters"),

  body("description")
    .trim()
    .optional()
    .isLength({ max: 100 })
    .withMessage("description must be under 100 characters"),

  body("price")
    .notEmpty()
    .withMessage("price is required")
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),

  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isIn(Object.values(ProductCategory))
    .withMessage(
      `category must be one of: ${Object.values(ProductCategory).join(", ")}`,
    ),
];

export const productUpdateRules = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name cannot be an empty string")
    .isLength({ max: 100 })
    .withMessage("name must be under 100 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    // REVIEW FIX: Fixed typo 'descritpion' -> 'description' in error message
    .withMessage("description cannot be an empty string")
    .isLength({ max: 100 })
    .withMessage("description must be under 100 characters"),

  body("price")
    .optional()
    .notEmpty()
    .withMessage("price cannot be an empty string")
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("category cannot be an empty string")
    .isIn(Object.values(ProductCategory))
    .withMessage(
      `category must be one of: ${Object.values(ProductCategory).join(", ")}`,
    ),
];
