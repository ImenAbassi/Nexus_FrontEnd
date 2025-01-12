import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeAttestation } from '../models/type-attestation.model';

@Injectable({
  providedIn: 'root',
})
export class TypeAttestationService {
  private apiUrl = 'http://localhost:8081/nexus/type-attestations'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les types d'attestations
  getAllTypeAttestations(): Observable<TypeAttestation[]> {
    return this.http.get<TypeAttestation[]>(this.apiUrl);
  }

  // Récupérer un type d'attestation par son ID
  getTypeAttestationById(id: number): Observable<TypeAttestation> {
    return this.http.get<TypeAttestation>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau type d'attestation
  createTypeAttestation(typeAttestation: TypeAttestation): Observable<TypeAttestation> {
    return this.http.post<TypeAttestation>(this.apiUrl, typeAttestation);
  }

  // Mettre à jour un type d'attestation existant
  updateTypeAttestation(id: number, typeAttestation: TypeAttestation): Observable<TypeAttestation> {
    return this.http.put<TypeAttestation>(`${this.apiUrl}/${id}`, typeAttestation);
  }

  // Supprimer un type d'attestation par son ID
  deleteTypeAttestation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
