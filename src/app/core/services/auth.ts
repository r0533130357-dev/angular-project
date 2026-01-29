import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginData, RegisterData, User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn = signal<boolean>(!!sessionStorage.getItem('token'));
  constructor() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  //הרשמה
  register(user: RegisterData) {
    const url = `${this.baseUrl}/register`;
    return this.http.post<AuthResponse>(url, user)
      .pipe(
        tap(res => this.saveSession(res))
      );
  }

  //התחברות
  login(user: LoginData) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<AuthResponse>(url, user)
      .pipe(
        tap(res => this.saveSession(res))
      );
  }

  //התנתקות
  logout() {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.isLoggedIn.set(false);
  }

  private saveSession(res: AuthResponse) {
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('user', JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
    this.isLoggedIn.set(true);
  }


}
