import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeConge } from '../models/DemandeConge.model';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeService {
  private apiUrl = 'http://localhost:8081/nexus/conges'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAllConges(): Observable<DemandeConge[]> {
    return this.http.get<DemandeConge[]>(this.apiUrl);
  }

  getCongeById(id: number): Observable<DemandeConge> {
    return this.http.get<DemandeConge>(`${this.apiUrl}/${id}`);
  }

    creerDemande(demande: DemandeConge): Observable<DemandeConge> {
      // Récupérer l'utilisateur depuis le localStorage et le parser
      const user = JSON.parse(localStorage.getItem('user') || '{}');
    
      // Structurer les données à envoyer
      const demandeToSend = {
        typeConge:demande.typeConge, // Envoyer l'objet typeConge complet
        user: user,                  // Envoyer l'objet user complet
        dateDebut: demande.dateDebut, // Format: "YYYY-MM-DD"
        dateFin: demande.dateFin,     // Format: "YYYY-MM-DD"
        raison: demande.raison
      };
    
      console.log('Données envoyées :', demandeToSend); // Debugging
    
      // Forcer le type de demandeToSend
      return this.http.post<DemandeConge>(`${this.apiUrl}/creer`, demandeToSend );
    }
  

  deleteConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  validerParSuperviseur(id: number, etat: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerSuperviseur/${id}`, { etat });
  }

  validerParChefProjet(id: number, etat: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerChefProjet/${id}`, { etat });
  }
}
