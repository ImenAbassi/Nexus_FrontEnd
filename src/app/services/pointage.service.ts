import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pointage } from '../models/Pointage.model';
import { PointageOperation } from '../models/PointageOperation.modal';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private apiUrl = 'http://localhost:8081/nexus/pointages'; // URL de base des APIs REST

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les pointages depuis le backend.
   */
  getAllPointages(): Observable<Pointage[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Pointage[]>(url).pipe(
      tap(data => console.log('Tous les pointages récupérés :', data)),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère les pointages par date depuis le backend.
   * @param date La date pour filtrer les pointages.
   */
  getPointagesByDate(date: string): Observable<Pointage[]> {
    const url = `${this.apiUrl}/by-date?date=${date}`;
    return this.http.get<Pointage[]>(url).pipe(
      tap(data => console.log(`Pointages récupérés pour la date ${date} :`, data)),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère un pointage par son ID.
   * @param id L'ID du pointage à récupérer.
   */
  getPointageById(id: number): Observable<Pointage> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pointage>(url).pipe(
      tap(data => console.log(`Pointage récupéré avec l'ID=${id}`, data)),
      catchError(this.handleError)
    );
  }

  /**
   * Crée un nouveau pointage dans le backend.
   * @param pointage Le pointage à créer.
   */
  createPointage(pointage: Pointage): Observable<Pointage> {
    const url = `${this.apiUrl}`;
    return this.http.post<Pointage>(url, pointage).pipe(
      tap(data => console.log('Nouveau pointage créé :', data)),
      catchError(this.handleError)
    );
  }

  createPointagesBySupervisor(supervisorId: number, date: string): Observable<Pointage[]> {
    const url = `${this.apiUrl}/create-by-supervisor/${supervisorId}?date=${date}`;
    return this.http.post<Pointage[]>(url, {}).pipe(
      tap(data => console.log('Pointages créés pour le superviseur :', data)),
      catchError(this.handleError)
    );
  }

  createPointageParJour(date:any): Observable<Pointage[]> {
    const url = `${this.apiUrl}`;
    return this.http.post<Pointage[]>(url, date).pipe(
      tap(data => console.log('Nouveau pointage créé :', data)),
      catchError(this.handleError)
    );
  }

  /**
   * Met à jour un pointage existant dans le backend.
   * @param id L'ID du pointage à mettre à jour.
   * @param pointage Les nouvelles données du pointage.
   */
  updatePointage(id: number, pointage: Pointage): Observable<Pointage> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Pointage>(url, pointage).pipe(
      tap(data => console.log(`Pointage mis à jour avec l'ID=${id}`, data)),
      catchError(this.handleError)
    );
  }

  /**
   * Supprime un pointage dans le backend.
   * @param id L'ID du pointage à supprimer.
   */
  deletePointage(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(data => console.log(`Pointage supprimé avec l'ID=${id}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Ajoute une opération à un pointage spécifique.
   * @param pointageId L'ID du pointage auquel ajouter l'opération.
   * @param operation L'opération à ajouter.
   */
  addOperationToPointage(pointageId: number, operation: any): Observable<PointageOperation> {
    const url = `${this.apiUrl}/${pointageId}/operations`;
    return this.http.post<PointageOperation>(url, operation).pipe(
      tap(data => console.log(`Opération ajoutée au pointage ID=${pointageId}`, data)),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère toutes les opérations d'un pointage spécifique.
   * @param pointageId L'ID du pointage dont on veut récupérer les opérations.
   */
  getOperationsByPointageId(pointageId: number): Observable<PointageOperation[]> {
    const url = `${this.apiUrl}/${pointageId}/operations`;
    return this.http.get<PointageOperation[]>(url).pipe(
      tap(data => console.log(`Opérations récupérées pour le pointage ID=${pointageId}`, data)),
      catchError(this.handleError)
    );
  }

  /**
   * Importe un fichier Excel contenant des pointages.
   * @param file Le fichier Excel à importer.
   */
  importExcelFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}/import`;
    return this.http.post<any>(url, formData).pipe(
      tap(data => console.log('Fichier Excel importé avec succès :', data)),
      catchError(this.handleError)
    );
  }







  // Update an operation
  updateOperation(operationId: number, operation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/operations/${operationId}`, operation).pipe(
      catchError(this.handleError)
    );
  }

  // Delete an operation
  deleteOperation(operationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/operations/${operationId}`).pipe(
      catchError(this.handleError)
    );
  }



  /**
   * Gestionnaire d'erreurs générique pour les requêtes HTTP.
   * @param error L'erreur renvoyée par la requête.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}