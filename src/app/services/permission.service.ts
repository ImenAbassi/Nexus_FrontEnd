import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private apiUrl = 'http://localhost:8081/nexus/permissions';

  constructor(private http: HttpClient) {}

  checkPermission(role: string, permission: string): Observable<boolean> {
    const requestData = { role, permission };
    return this.http.post<boolean>(`${this.apiUrl}/check`, requestData);
  }

  assignPermissionToRole(role: string, permission: string): Observable<void> {
    const requestData = { role, permission };
    return this.http.post<void>(`${this.apiUrl}/assign`, requestData);
  }
}
