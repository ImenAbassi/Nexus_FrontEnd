import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeureDepart } from '../models/heure-depart.model';

@Injectable({
  providedIn: 'root',
})
export class HeureDepartService {
  private apiUrl = 'http://localhost:8081/nexus/heure-departs'; // URL de base pour les appels backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les heures de départ
  getAllHeureDeparts(): Observable<HeureDepart[]> {
    return this.http.get<HeureDepart[]>(this.apiUrl);
  }

  // Récupérer une heure de départ par ID
  getHeureDepartById(id: number): Observable<HeureDepart> {
    return this.http.get<HeureDepart>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle heure de départ
  createHeureDepart(heureDepart: HeureDepart): Observable<HeureDepart> {
    return this.http.post<HeureDepart>(this.apiUrl, heureDepart);
  }

  // Mettre à jour une heure de départ par ID
  updateHeureDepart(id: number, heureDepart: HeureDepart): Observable<HeureDepart> {
    return this.http.put<HeureDepart>(`${this.apiUrl}/${id}`, heureDepart);
  }

  // Supprimer une heure de départ par ID
  deleteHeureDepart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
