import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, Application } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.getMockTasks());
  public tasks$ = this.tasksSubject.asObservable();

  private applicationsSubject = new BehaviorSubject<Application[]>([]);
  public applications$ = this.applicationsSubject.asObservable();

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.value.find(task => task.id === id);
  }

  getTasksByCategory(category: string): Task[] {
    return this.tasksSubject.value.filter(task => task.category === category);
  }

  createTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      status: 'open',
      applications: 0
    };
    const tasks = [...this.tasksSubject.value, newTask];
    this.tasksSubject.next(tasks);
  }

  applyToTask(taskId: string, application: Omit<Application, 'id' | 'appliedDate' | 'status'>): void {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      appliedDate: new Date(),
      status: 'pending'
    };
    const applications = [...this.applicationsSubject.value, newApplication];
    this.applicationsSubject.next(applications);

    const tasks = this.tasksSubject.value.map(task => {
      if (task.id === taskId) {
        return { ...task, applications: (task.applications || 0) + 1 };
      }
      return task;
    });
    this.tasksSubject.next(tasks);
  }

  getApplicationsByUser(userId: string): Application[] {
    return this.applicationsSubject.value.filter(app => app.userId === userId);
  }

  private getMockTasks(): Task[] {
    const now = new Date();
    return [
      {
        id: '1',
        title: 'Help with grocery shopping',
        description: 'Need someone to pick up groceries from the local supermarket. List will be provided.',
        category: 'Errands',
        budget: 25,
        location: 'Downtown, Seattle',
        date: new Date(now.getTime() + 86400000),
        postedBy: 'user1',
        postedByName: 'Sarah Johnson',
        status: 'open',
        applications: 3
      },
      {
        id: '2',
        title: 'Dog walking for a week',
        description: 'Looking for a reliable person to walk my golden retriever twice a day for one week.',
        category: 'Pet Care',
        budget: 150,
        location: 'Green Lake, Seattle',
        date: new Date(now.getTime() + 172800000),
        postedBy: 'user2',
        postedByName: 'Mike Chen',
        requirements: 'Must love dogs and have experience with large breeds',
        status: 'open',
        applications: 7
      },
      {
        id: '3',
        title: 'House cleaning - One time',
        description: 'Deep cleaning needed for a 2-bedroom apartment. Supplies will be provided.',
        category: 'Cleaning',
        budget: 100,
        location: 'Capitol Hill, Seattle',
        date: new Date(now.getTime() + 259200000),
        postedBy: 'user3',
        postedByName: 'Emily Rodriguez',
        status: 'open',
        applications: 5
      },
      {
        id: '4',
        title: 'Math tutoring for high school student',
        description: 'Need a tutor for algebra and geometry. 2 sessions per week for a month.',
        category: 'Tutoring',
        budget: 300,
        location: 'Bellevue, WA',
        date: new Date(now.getTime() + 345600000),
        postedBy: 'user4',
        postedByName: 'David Park',
        requirements: 'Math background required, teaching experience preferred',
        status: 'open',
        applications: 12
      },
      {
        id: '5',
        title: 'Furniture assembly',
        description: 'Need help assembling IKEA furniture (bed, desk, and bookshelf).',
        category: 'Handyman',
        budget: 75,
        location: 'Fremont, Seattle',
        date: new Date(now.getTime() + 432000000),
        postedBy: 'user5',
        postedByName: 'Jessica Wong',
        status: 'open',
        applications: 2
      },
      {
        id: '6',
        title: 'Airport pickup',
        description: 'Need a ride from SeaTac Airport to downtown Seattle on Friday evening.',
        category: 'Transportation',
        budget: 40,
        location: 'SeaTac Airport',
        date: new Date(now.getTime() + 518400000),
        postedBy: 'user6',
        postedByName: 'Tom Anderson',
        status: 'open',
        applications: 8
      },
      {
        id: '7',
        title: 'Garden maintenance',
        description: 'Weekly garden care including weeding, watering, and basic lawn maintenance.',
        category: 'Yard Work',
        budget: 200,
        location: 'Ballard, Seattle',
        date: new Date(now.getTime() + 604800000),
        postedBy: 'user7',
        postedByName: 'Linda Martinez',
        requirements: 'Gardening experience required',
        status: 'open',
        applications: 4
      },
      {
        id: '8',
        title: 'Event photography',
        description: 'Looking for a photographer for a birthday party (2 hours).',
        category: 'Photography',
        budget: 200,
        location: 'West Seattle',
        date: new Date(now.getTime() + 691200000),
        postedBy: 'user8',
        postedByName: 'Kevin Liu',
        requirements: 'Portfolio required',
        status: 'open',
        applications: 15
      },
      {
        id: '9',
        title: 'Moving help',
        description: 'Need 2 people to help move furniture from a 1-bedroom apartment.',
        category: 'Moving',
        budget: 120,
        location: 'University District, Seattle',
        date: new Date(now.getTime() + 777600000),
        postedBy: 'user9',
        postedByName: 'Amanda Brown',
        status: 'open',
        applications: 6
      }
    ];
  }
}
