import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from '../models/pays.model';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  private baseUrl = 'http://localhost:8081/nexus/pays'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les pays
  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.baseUrl);
  }

  // Récupérer un pays par son ID
  getPaysById(id: number): Observable<Pays> {
    return this.http.get<Pays>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouveau pays
  createPays(pays: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.baseUrl, pays);
  }

  // Mettre à jour un pays existant
  updatePays(id: number, pays: Pays): Observable<Pays> {
    return this.http.put<Pays>(`${this.baseUrl}/${id}`, pays);
  }

  // Supprimer un pays
  deletePays(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
