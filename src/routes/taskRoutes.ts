import { Router } from "express";
import { createTask, listTasks } from "../controllers/taskController";
import { validateCreateTask } from "../middleware/validation";

const router = Router();

router.get("/tasks", listTasks);
router.post("/tasks", validateCreateTask, createTask);

export default router;
