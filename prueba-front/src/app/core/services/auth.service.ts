import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap, of } from 'rxjs';

export interface User {
  id: string;
  email: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://104.236.31.102/auth';

  currentUser = signal<User | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.isLoggedIn()) {
      this.getProfile().subscribe();
    }
  }

  login(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('access_token', response.access_token);
        }
      }),
      tap(() => this.getProfile().subscribe())
    );
  }

  register(user: { fullName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
    this.currentUser.set(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
