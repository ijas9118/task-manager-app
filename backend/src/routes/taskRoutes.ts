import express from "express";
import { createTask, getUserTasks, updateTaskStatus } from "../controllers/TaskController";

const taskRouter = express.Router();

taskRouter.post("/", createTask);

taskRouter.get("/user/:userId", getUserTasks);

taskRouter.put("/:taskId/status", updateTaskStatus);

export default taskRouter;
