import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getMockUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    const user = this.getMockUser();
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    return true;
  }

  register(name: string, email: string, password: string): boolean {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      skills: [],
      completedTasks: 0,
      rating: 5.0
    };
    this.currentUserSubject.next(newUser);
    this.isAuthenticatedSubject.next(true);
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  updateProfile(user: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      this.currentUserSubject.next({ ...currentUser, ...user });
    }
  }

  private getMockUser(): User {
    return {
      id: 'currentUser',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff',
      skills: ['Cleaning', 'Pet Care', 'Tutoring'],
      completedTasks: 24,
      rating: 4.8,
      bio: 'Reliable and friendly task helper with 2 years of experience!'
    };
  }
}
