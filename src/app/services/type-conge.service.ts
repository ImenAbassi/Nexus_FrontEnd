import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeConge } from '../models/type-conge.model';

@Injectable({
  providedIn: 'root',
})
export class TypeCongeService {
  private apiUrl = 'http://localhost:8081/nexus/type-conges'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les types de congé
  getAllTypeConges(): Observable<TypeConge[]> {
    return this.http.get<TypeConge[]>(this.apiUrl);
  }

  // Récupérer un type de congé par son ID
  getTypeCongeById(id: number): Observable<TypeConge> {
    return this.http.get<TypeConge>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau type de congé
  createTypeConge(typeConge: TypeConge): Observable<TypeConge> {
    return this.http.post<TypeConge>(this.apiUrl, typeConge);
  }

  // Mettre à jour un type de congé existant
  updateTypeConge(id: number, typeConge: TypeConge): Observable<TypeConge> {
    return this.http.put<TypeConge>(`${this.apiUrl}/${id}`, typeConge);
  }

  // Supprimer un type de congé
  deleteTypeConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
