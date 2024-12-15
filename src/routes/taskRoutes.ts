import { Router } from "express";
import { createTask, listTasks, updateTask } from "../controllers/taskController";
import { validateCreateTask, validateUpdateTask } from "../middleware/validation";

const router = Router();

router.get("/tasks", listTasks);
router.post("/tasks", validateCreateTask, createTask);
router.put("/tasks/:id", validateUpdateTask, updateTask);

export default router;
