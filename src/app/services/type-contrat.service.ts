import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeContrat } from '../models/type-contrat.model';

@Injectable({
  providedIn: 'root',
})
export class TypeContratService {
  private apiUrl = 'http://localhost:8081/nexus/type-contrats'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les types de contrat
  getAllTypeContrats(): Observable<TypeContrat[]> {
    return this.http.get<TypeContrat[]>(this.apiUrl);
  }

  // Récupérer un type de contrat par son ID
  getTypeContratById(id: number): Observable<TypeContrat> {
    return this.http.get<TypeContrat>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau type de contrat
  createTypeContrat(typeContrat: TypeContrat): Observable<TypeContrat> {
    return this.http.post<TypeContrat>(this.apiUrl, typeContrat);
  }

  // Mettre à jour un type de contrat existant
  updateTypeContrat(id: number, typeContrat: TypeContrat): Observable<TypeContrat> {
    return this.http.put<TypeContrat>(`${this.apiUrl}/${id}`, typeContrat);
  }

  // Supprimer un type de contrat
  deleteTypeContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
