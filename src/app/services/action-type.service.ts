import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionType } from '../models/action-type.model';

@Injectable({
  providedIn: 'root'
})
export class ActionTypeService {

  private apiUrl = 'http://localhost:8081/nexus/actionTypes'; // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les types d'action
  getAllActionTypes(): Observable<ActionType[]> {
    return this.http.get<ActionType[]>(this.apiUrl);
  }

  // Récupérer un type d'action par son ID
  getActionTypeById(id: number): Observable<ActionType> {
    return this.http.get<ActionType>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau type d'action
  createActionType(actionType: ActionType): Observable<ActionType> {
    return this.http.post<ActionType>(this.apiUrl, actionType);
  }

  // Mettre à jour un type d'action
  updateActionType(id: number, actionType: ActionType): Observable<ActionType> {
    return this.http.put<ActionType>(`${this.apiUrl}/${id}`, actionType);
  }

  // Supprimer un type d'action
  deleteActionType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
