// src/app/services/societe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Societe } from '../models/Societe.model';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  private apiUrl = 'http://localhost:8081/nexus/societes'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les sociétés
  getAllSocietes(): Observable<Societe[]> {
    return this.http.get<Societe[]>(this.apiUrl);
  }

  // Récupérer une société par son ID
  getSocieteById(id: number): Observable<Societe> {
    return this.http.get<Societe>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle société
  createSociete(societe: Societe): Observable<Societe> {
    return this.http.post<Societe>(this.apiUrl, societe);
  }

  // Mettre à jour une société existante
  updateSociete(societe: Societe): Observable<Societe> {
    return this.http.put<Societe>(`${this.apiUrl}/${societe.id}`, societe);
  }

  // Supprimer une société
  deleteSociete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
