import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/nexus/auth/login';
  private logoutUrl = 'http://localhost:8081/nexus/auth/logout';

  constructor(private http: HttpClient, private router: Router) {}
  
  login(cin: string, password: string): Observable<any> {
    const loginRequest = { username: cin, password }; // Créez l'objet LoginRequest
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, loginRequest, { headers });
  }
  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {}, {
      withCredentials: true, // Assurez-vous d'envoyer les cookies avec la requête
    }).pipe(
      // Après la déconnexion, nettoyer le localStorage (ou toute autre donnée de session côté client)
      tap(() => {
        // Supprimez les informations d'authentification du client
        localStorage.removeItem('user');
        // Vous pouvez également supprimer d'autres données liées à l'utilisateur si nécessaire
      })
    );
  }
  

  
  
}
