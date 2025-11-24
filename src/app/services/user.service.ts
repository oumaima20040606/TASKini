import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // -------------------------------
  // API URLs
  // -------------------------------
  private springApi = 'http://localhost:8094';   // USER-SERVICE
  private keycloakTokenUrl =
    'http://localhost:8080/realms/taskini-realm/protocol/openid-connect/token';

  // -------------------------------
  // AUTH STATE
  // -------------------------------
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ===============================================================
  // REGISTER (Spring)
  // ===============================================================
 register(data: any): Observable<any> {
  return this.http.post(`http://localhost:8094/api/auth/register`, data);
}


  // ===============================================================
  // LOGIN (Keycloak)
  // ===============================================================
login(email: string, password: string) {
  const body = new URLSearchParams();
  body.set('grant_type', 'password');
  body.set('client_id', 'taskini_client');
  body.set('username', email);
  body.set('password', password);

  return this.http.post(
    'http://localhost:8080/realms/taskini-realm/protocol/openid-connect/token',
    body.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
}





  // ===============================================================
  // GET AUTH HEADERS
  // ===============================================================
  private getAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
  }

  // ===============================================================
  // GET USER BY ID (Secured with Token)
  // ===============================================================
getUserById(id: number): Observable<User> {
  return this.http.get<User>(
    `${this.springApi}/users/${id}`,
    { headers: this.getAuthHeaders() }
  );
}

  // ===============================================================
  // SET CURRENT USER
  // ===============================================================
  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  // ===============================================================
  // GET CURRENT USER
  // ===============================================================
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ===============================================================
  // LOGOUT
  // ===============================================================
  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
