import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourFerieService {
  private apiUrl = 'http://localhost:8081/nexus/joursferies';

  constructor(private http: HttpClient) {}

  // Obtenir tous les jours fériés
  getJoursFeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtenir un jour férié par ID
  getJourFerieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un jour férié
  createJourFerie(jourFerie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, jourFerie);
  }

  // Mettre à jour un jour férié
  updateJourFerie(id: number, jourFerie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, jourFerie);
  }

  // Supprimer un jour férié
  deleteJourFerie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
