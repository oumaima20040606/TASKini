import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Task, Application } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private springApi = 'http://localhost:9002';  // ✅ Votre port Task Service

  // Helper to build absolute backend URLs safely (prevents accidental relative requests)
  private buildUrl(path: string): string {
    try {
      // ensure path begins with a slash
      const p = path.startsWith('/') ? path : `/${path}`;
      return new URL(p, this.springApi).toString();
    } catch (e) {
      // fallback to simple concat
      return `${this.springApi.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    }
  }

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ===============================================================
  // GET ALL TASKS (Spring Boot)
  // ===============================================================
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.buildUrl('/tasks')).pipe(
      // normalize fields expected by the frontend and populate the local subject
      map((tasks: any[]) =>
        tasks.map((t: any) => ({
          ...t,
          // backend returns createdAt as ISO string — populate `date` used by TaskCard
          date: t.createdAt ? new Date(t.createdAt) : undefined
        }) as Task)
      ),
      tap((tasks: Task[]) => this.setTasks(tasks)),
      catchError(err => {
        console.error('Failed to fetch tasks', err);
        // ensure components get an empty array instead of failing
        this.setTasks([]);
        return of([]);
      })
    );
  }

  // ===============================================================
  // GET TASK BY ID (Spring Boot)
  // ===============================================================
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.buildUrl(`/tasks/${id}`));
  }

  // ===============================================================
  // GET TASKS BY CATEGORY (convenience helper)
  // ===============================================================
  getTasksByCategory(category: string): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.filter(t => t.category === category))
    );
  }

  // ===============================================================
  // GET TASKS BY USER ID (Spring Boot)
  // ===============================================================
  getTasksByUser(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.buildUrl(`/tasks/user/${userId}`));
  }

  // ===============================================================
  // CREATE TASK (Spring Boot)
  // ===============================================================
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.buildUrl('/tasks'), task);
  }

  // ===============================================================
  // UPDATE TASK (Spring Boot)
  // ===============================================================
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(this.buildUrl(`/tasks/${id}`), task);
  }

  // ===============================================================
  // APPLY TO A TASK (POST an application)
  // ===============================================================
  applyToTask(taskId: number, payload: any): Observable<any> {
    return this.http.post<any>(this.buildUrl(`/tasks/${taskId}/applications`), payload);
  }

  // ===============================================================
  // MÉTHODES LOCALES POUR LA GESTION D'ÉTAT
  // ===============================================================

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addTaskToLocal(task: Task): void {
    const tasks = [...this.tasksSubject.value, task];
    this.tasksSubject.next(tasks);
  }

  updateTaskLocal(updatedTask: Task): void {
    const tasks = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(tasks);
  }
}
