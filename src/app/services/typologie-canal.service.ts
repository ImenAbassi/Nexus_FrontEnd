import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypologieCanal } from '../models/TypologieCanal.model';


@Injectable({
  providedIn: 'root'
})
export class TypologieCanalService {
   api = 'http://localhost:8081/nexus';

  private apiUrl = `${this.api}/typologie-canaux`;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les typologies de canal
  getAllTypologieCanaux(): Observable<TypologieCanal[]> {
    return this.http.get<TypologieCanal[]>(this.apiUrl);
  }

  // Récupérer une typologie de canal par ID
  getTypologieCanalById(id: number): Observable<TypologieCanal> {
    return this.http.get<TypologieCanal>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle typologie de canal
  createTypologieCanal(typologieCanal: TypologieCanal): Observable<TypologieCanal> {
    return this.http.post<TypologieCanal>(this.apiUrl, typologieCanal);
  }

  // Mettre à jour une typologie de canal
  updateTypologieCanal( typologieCanal: TypologieCanal): Observable<TypologieCanal> {
    return this.http.put<TypologieCanal>(`${this.apiUrl}/${typologieCanal.id}`, typologieCanal);
  }

  // Supprimer une typologie de canal
  deleteTypologieCanal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
