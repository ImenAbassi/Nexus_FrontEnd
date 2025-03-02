import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pointage } from '../models/Pointage.model';
import { PointageOperation } from '../models/PointageOperation.modal';

@Injectable({
  providedIn: 'root',
})
export class PointageService {
  private apiUrl = 'http://localhost:8081/nexus/pointages'; // URL de base des APIs REST

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les pointages
   */
  getAllPointages(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupérer les pointages par date
   * @param date - Date pour filtrer les pointages
   */
  getPointagesByDate(date: string): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.apiUrl}/by-date?date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupérer un pointage par ID
   * @param id - ID du pointage
   */
  getPointageById(id: number): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Créer un nouveau pointage
   * @param pointage - Données du pointage à créer
   */
  createPointage(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(`${this.apiUrl}`, pointage).pipe(
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

  /**
   * Mettre à jour un pointage existant
   * @param id - ID du pointage
   * @param pointage - Données mises à jour du pointage
   */
  updatePointage(id: number, pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/${id}`, pointage).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Supprimer un pointage par ID
   * @param id - ID du pointage à supprimer
   */
  deletePointage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Valider un pointage
   * @param id - ID du pointage à valider
   */
  validatePointage(id: number): Observable<Pointage> {
    return this.http.post<Pointage>(`${this.apiUrl}/${id}/validate`, {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Ajouter une opération à un pointage
   * @param pointageId - ID du pointage
   * @param operation - Données de l'opération à ajouter
   */
  addOperationToPointage(
    pointageId: number,
    operation: PointageOperation
  ): Observable<PointageOperation> {
    return this.http
      .post<PointageOperation>(`${this.apiUrl}/${pointageId}/operations`, operation)
      .pipe(catchError(this.handleError));
  }

  /**
   * Mettre à jour une opération
   * @param operationId - ID de l'opération
   * @param operation - Données mises à jour de l'opération
   */
  updateOperation(
    operationId: number,
    operation: PointageOperation
  ): Observable<PointageOperation> {
    return this.http
      .put<PointageOperation>(`${this.apiUrl}/operations/${operationId}`, operation)
      .pipe(catchError(this.handleError));
  }

  /**
   * Supprimer une opération
   * @param operationId - ID de l'opération à supprimer
   */
  deleteOperation(operationId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/operations/${operationId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtenir toutes les opérations d'un pointage
   * @param pointageId - ID du pointage
   */
  getOperationsByPointageId(pointageId: number): Observable<PointageOperation[]> {
    return this.http
      .get<PointageOperation[]>(`${this.apiUrl}/${pointageId}/operations`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Importer un fichier Excel
   * @param file - Fichier Excel à importer
   */
  importExcelFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/import`, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Exporter les pointages vers un fichier Excel
   * @param date - Date pour filtrer les pointages (facultatif)
   */
  exportPointagesToExcel(date?: string): Observable<Blob> {
    const url = date ? `${this.apiUrl}/export/excel?date=${date}` : `${this.apiUrl}/export/excel`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gestion des erreurs HTTP
   * @param error - Erreur HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur s\'est produite.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}