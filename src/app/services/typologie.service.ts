import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Typologie } from '../models/typologie.model';

@Injectable({
  providedIn: 'root'
})
export class TypologieService {

  private apiUrl = 'http://localhost:8081/nexus/typologies'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer toutes les typologies
  getAllTypologies(): Observable<Typologie[]> {
    return this.http.get<Typologie[]>(this.apiUrl);
  }

  // Récupérer une typologie par ID
  getTypologieById(id: number): Observable<Typologie> {
    return this.http.get<Typologie>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle typologie
  createTypologie(typologie: Typologie): Observable<Typologie> {
    return this.http.post<Typologie>(this.apiUrl, typologie);
  }

  // Mettre à jour une typologie existante
  updateTypologie(id: number, typologie: Typologie): Observable<Typologie> {
    return this.http.put<Typologie>(`${this.apiUrl}/${id}`, typologie);
  }

  // Supprimer une typologie
  deleteTypologie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
