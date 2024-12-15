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

export interface TaskFilters {
  completed?: boolean;
  color?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
