// src/services/TaskService.ts
import fs from "fs/promises";
import path from "path";
import { Task, TaskStatus } from "../models/Task";

export class TaskService {
  private taskFilePath = path.join(__dirname, "../data/tasks.json");

  // Load tasks from the JSON file asynchronously
  private async loadTasksFromFile(): Promise<Task[]> {
    try {
      const fileData = await fs.readFile(this.taskFilePath, "utf-8");
      return JSON.parse(fileData) as Task[];
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return [];
    }
  }

  // Save tasks to the JSON file asynchronously
  private async saveTasksToFile(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(this.taskFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }

  // Method to create a new task
  async createTask(task: Task): Promise<Task> {
    const tasks = await this.loadTasksFromFile();
    tasks.push(task);
    await this.saveTasksToFile(tasks);
    return task;
  }

  // Method to get tasks for a specific user
  async getTasksByUser(userId: string): Promise<Task[]> {
    const tasks = await this.loadTasksFromFile();
    return tasks.filter((task) => task.userId === userId);
  }

  // Method to update the status of a task by ID
  async updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<Task | null> {
    const tasks = await this.loadTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex].status = newStatus;
    await this.saveTasksToFile(tasks);
    return tasks[taskIndex];
  }

  // Method to delete a task by ID
  async deleteTask(taskId: string): Promise<boolean> {
    const tasks = await this.loadTasksFromFile();
    const initialLength = tasks.length;

    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    if (updatedTasks.length === initialLength) {
      return false; // Task not found
    }

    await this.saveTasksToFile(updatedTasks);
    return true;
  }
}
