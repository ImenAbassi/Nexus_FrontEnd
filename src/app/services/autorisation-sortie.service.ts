import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorisationSortie, EtatDemande, ValidationHistorique } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AutorisationSortieService {
  private apiUrl = 'http://localhost:8081/nexus/autorisationSortie';

  constructor(private http: HttpClient) {}

  creerDemande(autorisationSortie: AutorisationSortie): Observable<AutorisationSortie> {
    return this.http.post<AutorisationSortie>(`${this.apiUrl}/creer`, autorisationSortie);
  }

  validerParSuperviseur(id: number, etat: EtatDemande): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerSuperviseur/${id}`, { etat });
  }

  validerParChefProjet(id: number, etat: EtatDemande): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerChefProjet/${id}`, { etat });
  }

  obtenirHistorique(id: number): Observable<ValidationHistorique[]> {
    return this.http.get<ValidationHistorique[]>(`${this.apiUrl}/historique/${id}`);
  }
}
