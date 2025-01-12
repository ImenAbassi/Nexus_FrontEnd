import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonction } from '../models/fonction.model';

@Injectable({
  providedIn: 'root',
})
export class FonctionService {
  private apiUrl = 'http://localhost:8081/nexus/fonctions'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les fonctions
  getAllFonctions(): Observable<Fonction[]> {
    return this.http.get<Fonction[]>(this.apiUrl);
  }

  // Récupérer une fonction par son ID
  getFonctionById(id: number): Observable<Fonction> {
    return this.http.get<Fonction>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle fonction
  createFonction(fonction: Fonction): Observable<Fonction> {
    return this.http.post<Fonction>(this.apiUrl, fonction);
  }

  // Mettre à jour une fonction existante
  updateFonction(id: number, fonction: Fonction): Observable<Fonction> {
    return this.http.put<Fonction>(`${this.apiUrl}/${id}`, fonction);
  }

  // Supprimer une fonction par son ID
  deleteFonction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
