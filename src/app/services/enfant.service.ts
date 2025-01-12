import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfant } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  private apiUrl = 'http://localhost:8081/nexus/enfants';

  constructor(private http: HttpClient) {}

  createEnfant(enfant: Enfant): Observable<Enfant> {
    return this.http.post<Enfant>(this.apiUrl, enfant);
  }

  getAllEnfants(): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(this.apiUrl);
  }

  getEnfantById(idEnfant: number): Observable<Enfant> {
    return this.http.get<Enfant>(`${this.apiUrl}/${idEnfant}`);
  }

  updateEnfant(idEnfant: number, enfantDetails: Enfant): Observable<Enfant> {
    return this.http.put<Enfant>(`${this.apiUrl}/${idEnfant}`, enfantDetails);
  }

  deleteEnfant(idEnfant: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idEnfant}`);
  }
}
