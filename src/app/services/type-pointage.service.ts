import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypePointage } from '../models/Type-pointage.model';

@Injectable({
  providedIn: 'root',
})
export class TypePointageService {

  private apiUrl = 'http://localhost:8081/nexus/typepointage';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TypePointage[]> {
    return this.http.get<TypePointage[]>(this.apiUrl);
  }

  getById(id: number): Observable<TypePointage> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TypePointage>(url);
  }

  create(TypePointage: TypePointage): Observable<TypePointage> {
    return this.http.post<TypePointage>(this.apiUrl, TypePointage);
  }

  update(id: number, TypePointage: TypePointage): Observable<TypePointage> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TypePointage>(url, TypePointage);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }



  getPrivileges(): any[] {
    const privileges = localStorage.getItem('privileges');
    return privileges ? JSON.parse(privileges) : [];
  }

  // Check if the user has a specific TypePointage
  hasPrivilege(privilegeNames: string | string[]): boolean {
    const privileges = this.getPrivileges();
    const requiredPrivileges = Array.isArray(privilegeNames) ? privilegeNames : [privilegeNames];

    return requiredPrivileges.some((privilegeName) =>
      privileges.some((TypePointage) => TypePointage.name === privilegeName)
    );
  }

  // Clear privileges (e.g., on logout)
  clearPrivileges(): void {
    localStorage.removeItem('privileges');
  }
}