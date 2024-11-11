import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { Task, TaskStatus } from "../models/Task";

const taskService = new TaskService();

// Handler for creating a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { userId, title, description } = req.body;

  if (!userId || !title || !description) {
    res.status(400).json({ error: "Missing required fields: userId, title, and description." });
    return;
  }

  const newTask = new Task(Date.now().toString(), userId, title, description, TaskStatus.TODO);
  try {
    const createdTask = await taskService.createTask(newTask);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Handler for getting tasks by user
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const tasks = await taskService.getTasksByUser(userId);
    if (tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for this user." });
      return;
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// Handler for updating task status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status || !Object.values(TaskStatus).includes(status as TaskStatus)) {
    res.status(400).json({ error: "Invalid status value." });
    return;
  }

  try {
    const updatedTask = await taskService.updateTaskStatus(taskId, status as TaskStatus);
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found." });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task status." });
  }
};
