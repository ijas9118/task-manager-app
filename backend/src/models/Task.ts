export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export class Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;

  constructor(id: string, userId: string, title: string, description: string, status: TaskStatus = TaskStatus.TODO) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  updateStatus(newStatus: TaskStatus): void {
    this.status = newStatus;
  }
}
