import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO } from "../types/task";

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
