import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compagne } from '../models/Compagne.model';

@Injectable({
  providedIn: 'root',
})
export class CompagneService {
  private apiUrl = 'http://localhost:8081/nexus/compagnes';

  constructor(private http: HttpClient) {}

  createCompagne(compagne: Compagne): Observable<Compagne> {
    return this.http.post<Compagne>(this.apiUrl, compagne);
  }

  getAllCompagnes(): Observable<Compagne[]> {
    return this.http.get<Compagne[]>(this.apiUrl);
  }

  getCompagneById(id: number): Observable<Compagne> {
    return this.http.get<Compagne>(`${this.apiUrl}/${id}`);
  }

  updateCompagne(id: number, compagneDetails: Compagne): Observable<Compagne> {
    return this.http.put<Compagne>(`${this.apiUrl}/${id}`, compagneDetails);
  }

  deleteCompagne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addPlanningsToCompagne(compagneId: number, planningId: number): Observable<Compagne> {
    return this.http.put<Compagne>(`${this.apiUrl}/${compagneId}/plannings/${planningId}`, {});
  }

  getJoursFeries(id: number, annee: number): Observable<Date[]> {
    return this.http.get<Date[]>(`${this.apiUrl}/${id}/jours-feries/${annee}`);
  }

  addJourFerieToCompagne(compagneId: number, jourFerieId: number): Observable<Compagne> {
    return this.http.put<Compagne>(`${this.apiUrl}/${compagneId}/jours-feries/${jourFerieId}`, {});
  }
}
