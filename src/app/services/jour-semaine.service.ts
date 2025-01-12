import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JourSemaine } from '../models/jour-semaine.model';

@Injectable({
  providedIn: 'root',
})
export class JourSemaineService {
  private baseUrl: string = 'http://localhost:8081/nexus/jour-semaine';  // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les jours de la semaine
  getAllJourSemaine(): Observable<JourSemaine[]> {
    return this.http.get<JourSemaine[]>(this.baseUrl);
  }

  // Récupérer un jour de la semaine par son ID
  getJourSemaineById(id: number): Observable<JourSemaine> {
    return this.http.get<JourSemaine>(`${this.baseUrl}/${id}`);
  }

  // Ajouter un nouveau jour de la semaine
  addJourSemaine(jourSemaine: JourSemaine): Observable<JourSemaine> {
    return this.http.post<JourSemaine>(this.baseUrl, jourSemaine);
  }

  // Mettre à jour un jour de la semaine
  updateJourSemaine(id: number, jourSemaine: JourSemaine): Observable<JourSemaine> {
    return this.http.put<JourSemaine>(`${this.baseUrl}/${id}`, jourSemaine);
  }

  // Supprimer un jour de la semaine par son ID
  deleteJourSemaine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
