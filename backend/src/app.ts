import express, { Application } from "express";
import taskRouter from "./routes/taskRoutes";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Successs" });
});

app.use("/api/tasks", taskRouter)

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// General error
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
