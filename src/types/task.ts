export interface Task {
  TID: number;
  TMID: number;
  TASK_TITLE: string;
  TASK_DESC: string;
  STATUS: number;
  STATUS_NAME: string;
  TIMELINE: string;
  PRIORITY: number;
  PRIORITY_NAME: string;
  CREATED_AT: string;
  MEMBER_NAME: string;
  MEMBER_EMAIL: string;
  MEMBER_POSITION: string;
}

export interface TeamMember {
  TMID: number;
  NAME: string;
  EMAIL: string;
  PID: number;
  Positions: string;
  CREATED_AT: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TaskFilters {
  search: string;
  status: string[];
  priority: string[];
  member: string[];

  timelineFrom: string;
  timelineTo: string;

  createdFrom: string;
  createdTo: string;

  sortBy: string;
  sortOrder: "ASC" | "DESC";

  page: number;
  limit: number;
}

export interface TaskApiResponse {
  success: boolean;
  data: Task[];
  pagination: Pagination;
  filters: TaskFilters;
}