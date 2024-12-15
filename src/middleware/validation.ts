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

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, color, completed } = req.body;
  const errors: string[] = [];

  // Title validation (optional for updates)
  if (title !== undefined) {
    if (title.length > 255) {
      errors.push("Title must be less than 255 characters");
    }
    if (title.trim().length === 0) {
      errors.push("Title cannot be empty");
    }
  }

  // Color validation (optional for updates)
  if (color !== undefined && color.trim().length === 0) {
    errors.push("Color cannot be empty");
  }

  // Completed validation (optional for updates)
  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push("Completed must be a boolean value");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};
