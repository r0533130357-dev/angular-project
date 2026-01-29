

export interface User {
  id?: string;
  email: string;
  name: string;
  role?:string
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}

export interface Team {
  id: number;
  name: string;
  created_at: string;
  members_count: number;
}

export interface Project {
  id: number;
  team_id: number;
  name: string;
  discription: string;
  status: string;
  created_at: string;
}
export interface ProjectRequest {
  teamId: number;
  name: string;
  discription: string;
}
export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: string;  
  priority: string;
  assignee_id: number | null;
  due_date: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}


export interface CreateTaskRequest {
  projectId: number;
  title: string;
  description: string;
  status?: string;
  priority?: string;
  assigneeId?: number; 
  dueDate?: string;    
  orderIndex?: number;
}
export interface TaskComment { 
  id: number;
  task_id: number;
  user_id: number;
  body: string;
  created_at: string;
  author_name: string; 
}