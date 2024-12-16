import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTaskDTO, PaginationParams, TaskFilters, UpdateTaskDTO } from "../types/task";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData: CreateTaskDTO = req.body;

    const task = await prisma.task.create({
      data: taskData,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      res.status(404).json({
        error: {
          message: "Task not found",
          code: "TASK_NOT_FOUND",
          status: 404,
        },
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      error: {
        message: "Failed to fetch task",
        code: "SERVER_ERROR",
        status: 500,
      },
    });
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    // Get pagination parameters
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (Number(page) - 1) * Number(limit);

    const filters: TaskFilters = {};

    if (req.query.completed !== undefined) {
      filters.completed = req.query.completed === "true";
    }

    if (req.query.color) {
      filters.color = req.query.color as string;
    }

    if (req.query.search) {
      filters.search = req.query.search as string;
    }

    const where = {
      AND: [
        filters.completed !== undefined ? { completed: filters.completed } : {},
        filters.color ? { color: filters.color } : {},
        filters.search
          ? {
              title: {
                contains: filters.search,
                mode: "insensitive" as const,
              },
            }
          : {},
      ],
    };

    const tasks = await prisma.task.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalTasks = await prisma.task.count({ where });
    const completedTasks = await prisma.task.count({
      where: {
        ...where,
        completed: true,
      },
    });

    res.status(200).json({
      tasks,
      filters: {
        completed: filters.completed,
        color: filters.color,
        search: filters.search,
      },
      pagination: {
        total: totalTasks,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalTasks / Number(limit)),
      },
      summary: {
        total: totalTasks,
        completed: completedTasks,
      },
    });
  } catch (error) {
    console.error("Error listing tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateTaskDTO = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      res.status(404).json({
        error: {
          message: "Task not found",
          code: "TASK_NOT_FOUND",
          status: 404,
        },
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      error: {
        message: "Failed to update task",
        code: "SERVER_ERROR",
        status: 500,
      },
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      res.status(404).json({
        error: {
          message: "Task not found",
          code: "TASK_NOT_FOUND",
          status: 404,
        },
      });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      error: {
        message: "Failed to delete task",
        code: "SERVER_ERROR",
        status: 500,
      },
    });
  }
};
