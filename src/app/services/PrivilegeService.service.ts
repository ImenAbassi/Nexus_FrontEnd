// privilege.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Privilege } from '../models/Privilege.model';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class PrivilegeService {

  private apiUrl = 'http://localhost:8081/nexus/privileges'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all privileges
  getAllPrivileges(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(this.apiUrl);
  }

  // Get a privilege by ID
  getPrivilegeById(id: number): Observable<Privilege> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Privilege>(url);
  }

  // Create a new privilege
  createPrivilege(privilege: Privilege): Observable<Privilege> {
    return this.http.post<Privilege>(this.apiUrl, privilege);
  }

  // Update an existing privilege
  updatePrivilege(id: number, privilege: Privilege): Observable<Privilege> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Privilege>(url, privilege);
  }

  // Delete a privilege
  deletePrivilege(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}