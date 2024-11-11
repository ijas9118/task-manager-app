import { Task, TaskStatus } from "../models/Task";
import fs from "fs";
import path from "path";

export class TaskService {
  private taskFilePath = path.join(__dirname, "../data/task.json");
  private tasks: Task[] = [];

  // method to create new task
  createTask(task: Task): void {
    this.tasks.push(task);
  }

  // get tasks for specific user
  getTaskByUser(userId: string): Task[] {
    console.log(this.tasks);
    return this.tasks.filter((task) => {
      console.log(task);
      return task.userId === userId;
    });
  }

  // Update the status of a task
  updateTaskStatus(taskId: string, newStatus: TaskStatus): Task | null {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.updateStatus(newStatus);
      return task;
    }
    return null;
  }
}
