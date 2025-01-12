import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sexe } from '../models/sexe.model';

@Injectable({
  providedIn: 'root',
})
export class SexeService {
  private apiUrl = 'http://localhost:8081/nexus/sexes'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les sexes
  getAllSexes(): Observable<Sexe[]> {
    return this.http.get<Sexe[]>(this.apiUrl);
  }

  // Récupérer un sexe par son ID
  getSexeById(id: number): Observable<Sexe> {
    return this.http.get<Sexe>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau sexe
  createSexe(sexe: Sexe): Observable<Sexe> {
    return this.http.post<Sexe>(this.apiUrl, sexe);
  }

  // Mettre à jour un sexe existant
  updateSexe(id: number, sexe: Sexe): Observable<Sexe> {
    return this.http.put<Sexe>(`${this.apiUrl}/${id}`, sexe);
  }

  // Supprimer un sexe par son ID
  deleteSexe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
