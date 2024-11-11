import express from "express";
import { createTask, deleteTask, getUserTasks, updateTaskStatus } from "../controllers/TaskController";

const taskRouter = express.Router();

taskRouter.post("/", createTask);

taskRouter.get("/user/:userId", getUserTasks);

taskRouter.put("/:taskId/status", updateTaskStatus);

taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
