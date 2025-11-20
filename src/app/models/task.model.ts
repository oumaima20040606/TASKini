export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  date: Date;
  postedBy: string;
  postedByName: string;
  requirements?: string;
  imageUrl?: string;
  status: 'open' | 'in-progress' | 'completed';
  applications?: number;
}

export interface Application {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  message: string;
  proposedPrice?: number;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills: string[];
  completedTasks: number;
  rating: number;
  bio?: string;
}
