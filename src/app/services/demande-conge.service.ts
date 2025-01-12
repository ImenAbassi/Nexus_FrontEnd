import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeConge, EtatDemande } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeService {
  private apiUrl = 'http://localhost:8081/nexus/conges';

  constructor(private http: HttpClient) {}

  getAllConges(): Observable<DemandeConge[]> {
    return this.http.get<DemandeConge[]>(this.apiUrl);
  }

  getCongeById(id: number): Observable<DemandeConge> {
    return this.http.get<DemandeConge>(`${this.apiUrl}/${id}`);
  }

  creerDemande(demandeConge: DemandeConge): Observable<DemandeConge> {
    return this.http.post<DemandeConge>(`${this.apiUrl}/creer`, demandeConge);
  }

  deleteConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  validerParSuperviseur(id: number, etat: EtatDemande): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerSuperviseur/${id}`, { etat });
  }

  validerParChefProjet(id: number, etat: EtatDemande): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerChefProjet/${id}`, { etat });
  }
}
