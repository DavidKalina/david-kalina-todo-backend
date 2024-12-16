import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "../controllers/taskController";
import { validateCreateTask, validateTaskId, validateUpdateTask } from "../middleware/validation";

const router = Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", validateTaskId, getTask);
router.post("/tasks", validateCreateTask, createTask);
router.put("/tasks/:id", validateUpdateTask, updateTask);
router.delete("/tasks/:id", validateTaskId, deleteTask);

export default router;
