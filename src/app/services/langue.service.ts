import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Langue } from '../models/langue.model';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  private apiUrl = 'http://localhost:8081/nexus/langues'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer toutes les langues
  getAllLangues(): Observable<Langue[]> {
    return this.http.get<Langue[]>(this.apiUrl);
  }

  // Récupérer une langue par ID
  getLangueById(id: number): Observable<Langue> {
    return this.http.get<Langue>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle langue
  createLangue(langue: Langue): Observable<Langue> {
    return this.http.post<Langue>(this.apiUrl, langue);
  }

  // Mettre à jour une langue existante
  updateLangue(id: number, langue: Langue): Observable<Langue> {
    return this.http.put<Langue>(`${this.apiUrl}/${id}`, langue);
  }

  // Supprimer une langue
  deleteLangue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
