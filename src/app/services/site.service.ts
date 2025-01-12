import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private apiUrl = 'http://localhost:8081/nexus/sites'; // L'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les sites
  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }

  // Récupérer un site par ID
  getSiteById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau site
  createSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site);
  }

  // Mettre à jour un site existant
  updateSite( site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${site.id}`, site);
  }

  // Supprimer un site
  deleteSite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
