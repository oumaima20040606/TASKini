import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private springApi = 'http://localhost:8094';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ===============================================================
  // REGISTER (Spring)
  // ===============================================================
  register(data: any): Observable<any> {
    return this.http.post(`${this.springApi}/api/auth/register`, data);
  }

  // ===============================================================
  // LOGIN (Spring – بدون Keycloak)
  // ===============================================================
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(
      `${this.springApi}/api/auth/login`,
      { email, password }
    );
  }

  // ===============================================================
  // GET USER BY ID (Spring)
  // ===============================================================
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.springApi}/users/${id}`);
  }
 // ===============================================================
// UPDATE USER (Spring)
// ===============================================================
updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.springApi}/users/${user.id}`, user);
}


  // ===============================================================
  // SET CURRENT USER
  // ===============================================================
  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }

  // ===============================================================
  // GET CURRENT USER FROM LOCALSTORAGE
  // ===============================================================
  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }


  // ===============================================================
  // LOGOUT
  // ===============================================================
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
