import { Router } from "express";
import { createTask } from "../controllers/taskController";
import { validateCreateTask } from "../middleware/validation";

const router = Router();

router.post("/tasks", validateCreateTask, createTask);

export default router;
