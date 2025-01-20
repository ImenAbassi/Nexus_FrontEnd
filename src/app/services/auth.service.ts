import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/nexus/auth/login';
  private logoutUrl = 'http://localhost:8081/nexus/auth/logout';
  private verifyTokenUrl = 'http://localhost:8081/nexus/auth/verifyToken';
  private refreshTokenUrl = 'http://localhost:8081/nexus/auth/refreshToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(cin: string, password: string): Observable<LoginResponse> {
    const loginRequest = { username: cin, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(this.apiUrl, loginRequest, { headers }).pipe(
      tap((response) => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError)
    );
  }


  logout(): Observable<any> {
    const token = localStorage.getItem('token');
  
    return this.http.post(this.logoutUrl, {}, { responseType: 'text' }).pipe(
      tap(() => {
        this.clearLocalStorage();
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError)
    );
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(this.verifyTokenUrl).pipe(
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(this.refreshTokenUrl, {}).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Add token expiry check if needed
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}