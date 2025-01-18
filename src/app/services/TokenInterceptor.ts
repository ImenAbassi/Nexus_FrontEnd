import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');
    console.log(token);

    // Vérifier si la requête nécessite un token
    if (this.requiresToken(request)) {
      if (token) {
        // Cloner la requête et ajouter l'en-tête d'autorisation
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    // Passer la requête modifiée au prochain intercepteur ou au backend
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérer les erreurs HTTP
        console.error('HTTP Error:', error);
        return throwError(() => error); // Propager l'erreur
      })
    );
  }

  /**
   * Vérifie si la requête nécessite un token.
   * Les requêtes vers 'login' ou les assets ne nécessitent pas de token.
   */
  private requiresToken(request: HttpRequest<any>): boolean {
    return !request.url.endsWith('login') && !request.url.includes('assets');
  }
}