import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur inattendue est survenue.';
        let errorTitle = `Erreur ${error.status}`;

        // Gestion des différents codes de statut HTTP
        switch (error.status) {
          // Erreurs client (4xx)
          case 400:
            errorMessage = 'Requête invalide. Veuillez vérifier les données envoyées.';
            break;
          case 401:
            errorMessage = 'Session expirée. Veuillez vous reconnecter.';
            this.router.navigate(['/login']);
            break;
          case 403:
            errorMessage = "Vous n'avez pas la permission d'accéder à cette ressource.";
            this.router.navigate(['/forbidden']);
            break;
          case 404:
            errorMessage = 'Ressource non trouvée.';
            break;
          case 405:
            errorMessage = 'Méthode non autorisée.';
            break;
          case 408:
            errorMessage = 'La requête a expiré. Veuillez réessayer.';
            break;
          case 409:
            errorMessage = 'Conflit de données. Veuillez vérifier les informations fournies.';
            break;
          case 429:
            errorMessage = 'Trop de requêtes. Veuillez ralentir.';
            break;

          // Erreurs serveur (5xx)
          case 500:
            errorMessage = 'Une erreur interne du serveur est survenue. Veuillez réessayer plus tard.';
            break;
          case 502:
            errorMessage = 'Mauvaise passerelle. Le serveur a reçu une réponse invalide.';
            break;
          case 503:
            errorMessage = 'Le service est actuellement indisponible. Veuillez réessayer plus tard.';
            break;
          case 504:
            errorMessage = 'La passerelle a expiré. Veuillez réessayer.';
            break;

          // Autres erreurs
          default:
            if (error.status >= 500) {
              errorMessage = 'Une erreur serveur est survenue. Veuillez réessayer plus tard.';
            } else if (error.status >= 400) {
              errorMessage = 'Une erreur client est survenue. Veuillez vérifier votre requête.';
            }
            console.error('Erreur HTTP non gérée:', error);
            break;
        }

        // Affiche une alerte SweetAlert2 avec le message d'erreur
        Swal.fire({
          title: errorTitle,
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          // La redirection pour les cas 401 et 403 est déjà gérée dans le switch.
          // Aucune action supplémentaire n'est nécessaire ici.
          if (error.status === 401 || error.status === 403) {
            // La redirection a déjà été effectuée dans le switch.
            // Vous pouvez ajouter des actions supplémentaires ici si nécessaire.
          }
        });

        // Retourne l'erreur en tant qu'observable pour continuer la chaîne d'erreurs
        return throwError(error);
      })
    );
  }
}