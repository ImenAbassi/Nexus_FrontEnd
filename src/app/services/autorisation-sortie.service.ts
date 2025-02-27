import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationHistorique } from '../models/user.model';
import { AutorisationSortie } from '../models/AutorisationSortie.model';

@Injectable({
  providedIn: 'root'
})
export class AutorisationSortieService {
  private apiUrl = 'http://localhost:8081/nexus/autorisationSortie';

  constructor(private http: HttpClient) {}

  // Créer une nouvelle autorisation de sortie
  creerDemande(autorisationSortie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Structurer les données à envoyer
    const demandeToSend = {
          dateCreation: new Date(),
          dateDebut: autorisationSortie.dateDebut,
          dateFin: autorisationSortie.dateFin,
          heureDebut: autorisationSortie.heureDebut,
          heureFin: autorisationSortie.heureFin,
          nbreHeure: autorisationSortie.nbreHeure,
          utilisateur: user,   
          etatSuperviseur: 'EN_ATTENTE',
          etatChefProjet: 'EN_ATTENTE',
          etatRH: 'EN_ATTENTE',
          raison: autorisationSortie.raison
    };
    return this.http.post<any>(`${this.apiUrl}/creer`, demandeToSend);
  }

  // Valider une autorisation de sortie par le superviseur
  validerParSuperviseurs(id: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerSuperviseur/${id}`, { });
  }

  // Valider une autorisation de sortie par le chef de projet
  validerParChefProjets(id: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/validerChefProjet/${id}`, { });
  }

  // Obtenir l'historique des validations pour une autorisation de sortie
  obtenirHistorique(id: number): Observable<ValidationHistorique[]> {
    return this.http.get<ValidationHistorique[]>(`${this.apiUrl}/historique/${id}`);
  }

  // Récupérer toutes les autorisations de sortie
  getAllAutorisations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/toutes`);
  }

  // Récupérer une autorisation de sortie par son ID
  getAutorisationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer une autorisation de sortie
  deleteAutorisation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }

  // Mettre à jour une autorisation de sortie
  updateAutorisation(id: number, autorisationSortie: AutorisationSortie): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifier/${id}`, autorisationSortie);
  }

  // Récupérer les autorisations de sortie en attente de validation par le superviseur
  getAutorisationsEnAttenteSuperviseur(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enAttenteSuperviseur`);
  }

  // Récupérer les autorisations de sortie en attente de validation par le chef de projet
  getAutorisationsEnAttenteChefProjet(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enAttenteChefProjet`);
  }

  // Récupérer les autorisations de sortie validées
  getAutorisationsValidees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/validees`);
  }

  // Récupérer les autorisations de sortie refusées
  getAutorisationsRefusees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/refusees`);
  }

  getAutorisationsByUser(userId: number): Observable<AutorisationSortie[]> {
    return this.http.get<AutorisationSortie[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Récupérer toutes les autorisations de sortie pour un superviseur spécifique
  getAutorisationsForSupervisor(supervisorId: number): Observable<AutorisationSortie[]> {
    return this.http.get<AutorisationSortie[]>(`${this.apiUrl}/superviseur/${supervisorId}`);
  }

  // Récupérer toutes les autorisations de sortie pour un chef de projet spécifique
  getAutorisationsForProjectLeader(projectLeaderId: number): Observable<AutorisationSortie[]> {
    return this.http.get<AutorisationSortie[]>(`${this.apiUrl}/chef-projet/${projectLeaderId}`);
  }

    validerParSuperviseur(id: number, etat: string): Observable<any> {
      // Ajouter l'état en tant que paramètre de requête
      const params = new HttpParams().set('etat', etat);
  
      // Envoyer la requête POST avec l'ID dans l'URL et l'état en paramètre
      return this.http.post<any>(`${this.apiUrl}/validerSuperviseur/${id}`, {}, { params });
    }
  
    validerParChefProjet(id: number, etat: string): Observable<any> {
      // Ajouter l'état en tant que paramètre de requête
      const params = new HttpParams().set('etat', etat);
  
      // Envoyer la requête POST avec l'ID dans l'URL et l'état en paramètre
      return this.http.post<any>(`${this.apiUrl}/validerChefProjet/${id}`, {}, { params });
    }
  
    validerParRH(id: number, etat: string): Observable<any> {
      // Ajouter l'état en tant que paramètre de requête
      const params = new HttpParams().set('etat', etat);
  
      // Envoyer la requête POST avec l'ID dans l'URL et l'état en paramètre
      return this.http.post<any>(`${this.apiUrl}/validerRH/${id}`, {}, { params });
    }
}