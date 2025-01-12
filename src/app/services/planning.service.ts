import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planning } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  private apiUrl = 'http://localhost:8081/nexus/plannings';

  constructor(private http: HttpClient) {}

  createPlanning(planning: Planning): Observable<Planning> {
    return this.http.post<Planning>(this.apiUrl, planning);
  }

  getAllPlannings(): Observable<Planning[]> {
    return this.http.get<Planning[]>(this.apiUrl);
  }

  getPlanningById(id: number): Observable<Planning> {
    return this.http.get<Planning>(`${this.apiUrl}/${id}`);
  }

  updatePlanning( planningDetails: Planning): Observable<Planning> {
    return this.http.put<Planning>(`${this.apiUrl}/${planningDetails.id}`, planningDetails);
  }

  deletePlanning(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
