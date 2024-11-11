import { Request, Response } from "express";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";

const taskService = new TaskService();

export const createTask = (req: Request, res: Response): void => {
  const { userId, title, description } = req.body;

  if (!userId || !title || !description) {
    res.status(400).json({ error: "Missing required fields: userId, title, and description." });
  }

  const newTask = new Task(Date.now().toString(), userId, title, description);

  try {
    taskService.createTask(newTask);
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getUserTasks = (req: Request, res: Response): void => {
  const { userId } = req.params;

  try {
    const tasks = taskService.getTaskByUser(userId);

    if (tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for this user." });
      return;
    }

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTaskStatus = (req: Request, res: Response): void => {};
