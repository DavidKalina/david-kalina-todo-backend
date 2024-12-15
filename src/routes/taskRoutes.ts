import { Router } from "express";
import { createTask, deleteTask, listTasks, updateTask } from "../controllers/taskController";
import { validateCreateTask, validateTaskId, validateUpdateTask } from "../middleware/validation";

const router = Router();

router.get("/tasks", listTasks);
router.post("/tasks", validateCreateTask, createTask);
router.put("/tasks/:id", validateUpdateTask, updateTask);
router.delete("/tasks/:id", validateTaskId, deleteTask);

export default router;
