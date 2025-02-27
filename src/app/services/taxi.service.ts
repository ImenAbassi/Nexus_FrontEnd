import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taxi } from '../models/Taxi.model';
import { EtatDemande } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TaxiService {
  private apiUrl = 'http://localhost:8081/nexus/taxi'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les demandes de taxi
  obtenirTousLesTaxis(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(`${this.apiUrl}/tous`);
  }

  // Ajouter une demande de taxi
  ajouterTaxi(userId: number, taxiRequest: { localisationArrivee: string; heureDepart: string }): Observable<Taxi> {
    return this.http.post<Taxi>(`${this.apiUrl}/demander/${userId}`, taxiRequest);
  }

  // Mettre à jour l'état d'une demande de taxi
  mettreAJourEtatTaxi(id: number, etat: EtatDemande): Observable<Taxi> {
    return this.http.put<Taxi>(`${this.apiUrl}/${id}/etat`, { etat });
  }

  // Supprimer une demande de taxi
  supprimerTaxi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTaxisByUser(userId: number): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Valider une demande de taxi
  validateDemande(id: number, etatDemande: string): Observable<Taxi> {
    return this.http.put<Taxi>(`${this.apiUrl}/${id}/validate`, null, {
      params: { etatDemande },
    });
  }
}