import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pointage } from '../models/Pointage.model';

@Injectable({
  providedIn: 'root',
})
export class PointageService {
  private apiUrl = 'http://localhost:8081/nexus/pointages'; // URL de base des APIs REST

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.apiUrl}/${id}`);
  }

  create(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(this.apiUrl, pointage);
  }

  createWithOperation(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(`${this.apiUrl}/withoperation`, pointage);
  }
  updateWithOperation(id: number,pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/withoperation/${id}`, pointage);
  }
  update(id: number, pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/${id}`, pointage);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  validate(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/validate`, null);
  }

  validerRefuser(id: number, etat: string): Observable<any> {
      // Ajouter l'état en tant que paramètre de requête
      const params = new HttpParams().set('etat', etat);
  
      // Envoyer la requête POST avec l'ID dans l'URL et l'état en paramètre
      return this.http.post<any>(`${this.apiUrl}/valider/${id}`, {}, { params });
    }

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