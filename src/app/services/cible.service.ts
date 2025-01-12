import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cible } from '../models/cible.model';

@Injectable({
  providedIn: 'root'
})
export class CibleService {

  private apiUrl = 'http://localhost:8081/nexus/cibles'; // L'URL de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer toutes les cibles
  getAllCibles(): Observable<Cible[]> {
    return this.http.get<Cible[]>(this.apiUrl);
  }

  // Récupérer une cible par son ID
  getCibleById(id: number): Observable<Cible> {
    return this.http.get<Cible>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle cible
  createCible(cible: Cible): Observable<Cible> {
    return this.http.post<Cible>(this.apiUrl, cible);
  }

  // Mettre à jour une cible existante
  updateCible(id: number, cible: Cible): Observable<Cible> {
    return this.http.put<Cible>(`${this.apiUrl}/${id}`, cible);
  }

  // Supprimer une cible
  deleteCible(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
