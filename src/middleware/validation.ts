import { Request, Response, NextFunction } from "express";

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, color } = req.body;

  const errors: string[] = [];

  if (!title) {
    errors.push("Title is required");
  } else if (title.length > 255) {
    errors.push("Title must be less than 255 characters");
  }

  if (!color) {
    errors.push("Color is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  }

  next();
};
