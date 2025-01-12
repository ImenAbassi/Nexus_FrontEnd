import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtatCivil } from '../models/etat-civil.model';

@Injectable({
  providedIn: 'root',
})
export class EtatCivilService {
  private apiUrl = 'http://localhost:8081/nexus/etat-civils'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les états civils
  getAllEtatCivils(): Observable<EtatCivil[]> {
    return this.http.get<EtatCivil[]>(this.apiUrl);
  }

  // Méthode pour récupérer un état civil par ID
  getEtatCivilById(id: number): Observable<EtatCivil> {
    return this.http.get<EtatCivil>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer un état civil
  createEtatCivil(etatCivil: EtatCivil): Observable<EtatCivil> {
    return this.http.post<EtatCivil>(this.apiUrl, etatCivil);
  }

  // Méthode pour mettre à jour un état civil
  updateEtatCivil(id: number, etatCivil: EtatCivil): Observable<EtatCivil> {
    return this.http.put<EtatCivil>(`${this.apiUrl}/${id}`, etatCivil);
  }

  // Méthode pour supprimer un état civil
  deleteEtatCivil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
