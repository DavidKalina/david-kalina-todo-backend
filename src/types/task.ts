export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDTO {
  title: string;
  color: string;
}
