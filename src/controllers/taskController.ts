import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, PaginationParams, TaskFilters } from "../types/task";

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

export const listTasks = async (req: Request, res: Response) => {
  try {
    // Get pagination parameters
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (Number(page) - 1) * Number(limit);

    // Build filter conditions
    const filters: TaskFilters = {};

    // Handle completion status filter
    if (req.query.completed !== undefined) {
      filters.completed = req.query.completed === "true";
    }

    // Handle color filter
    if (req.query.color) {
      filters.color = req.query.color as string;
    }

    // Handle search filter
    if (req.query.search) {
      filters.search = req.query.search as string;
    }

    // Build the where clause for Prisma
    const where = {
      AND: [
        // Add completion filter if present
        filters.completed !== undefined ? { completed: filters.completed } : {},
        // Add color filter if present
        filters.color ? { color: filters.color } : {},
        // Add search filter if present
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

    // Get filtered tasks with pagination
    const tasks = await prisma.task.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get total counts for filtered results
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
