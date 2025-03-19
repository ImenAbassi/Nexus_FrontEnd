import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Enfant, EtatUser, User, UserCompagne } from '../models/user.model';
import { UserCompagneDTO } from '../models/UserCompagneDTO.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/nexus/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUsersWithoutSupervisorOrProjectLeader(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users-without-supervisor-or-project-leader`);
  }
  
  getUsersWithSupervisorOrProjectLeader(): Observable<UserCompagne[]> {
    return this.http.get<UserCompagne[]>(`${this.apiUrl}/users-with-supervisor-or-project-leader`);
  }
  
  getUserById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${idUser}`);
  }

  createUserAndAssignToCompagne(dto: UserCompagneDTO): Observable<UserCompagne> {
    return this.http.post<UserCompagne>(`${this.apiUrl}/create-and-assign`, dto);
  }
  // Dans UserService.ts
  getUserCompagne(userCompagneId: number): Observable<UserCompagne> {
    return this.http.get<UserCompagne>(`${this.apiUrl}/${userCompagneId}`);
  }
  
  updateUserCompagne(userCompagneId: any, userCompagneDTO: UserCompagneDTO): Observable<UserCompagne> {
    return this.http.put<UserCompagne>(`${this.apiUrl}/update/${userCompagneId}`, userCompagneDTO);
  }
  
  

  assignUserToCompagne(dto: UserCompagneDTO): Observable<UserCompagne> {
    return this.http.post<UserCompagne>(`${this.apiUrl}/assignToCompagne`, dto);
  }

  updateUser(idUser: number, userDetails: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${idUser}`, userDetails);
  }

  deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUser}`);
  }

  updateUserEtat(idUser: number, nouvelEtat: EtatUser, motif: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idUser}/etat`, { nouvelEtat, motif });
  }

  addEnfantsToUser(userId: number, enfants: Enfant[]): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/enfants`, enfants);
  }

  assignUserToSociete(userId: number, societeId: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/assign-societe/${societeId}`, {});
  }
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post(`${this.apiUrl}/${userId}/change-password`, body);
  }

  createUserFromCandidat(candidatId: number): Observable<{ status: string; message: string }> {
    const url = `${this.apiUrl}/create-from-candidat/${candidatId}`;
    return this.http.post<{ status: string; message: string }>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

   // Ajouter un User
   addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Modifier un User
  updateUserNew(id: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<any>(url, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
