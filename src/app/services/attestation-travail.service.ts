import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttestationTravail, EtatDemande, } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AttestationTravailService {
  private apiUrl = 'http://localhost:8081/nexus/attestation-travail';

  constructor(private http: HttpClient) {}

  creerAttestation(userId: number, attestation: AttestationTravail): Observable<AttestationTravail> {
    return this.http.post<AttestationTravail>(`${this.apiUrl}/creer/${userId}`, attestation);
  }

  obtenirAttestationsParUtilisateur(userId: number): Observable<AttestationTravail[]> {
    return this.http.get<AttestationTravail[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  mettreAJourEtat(attestationId: number, nouvelEtat: EtatDemande): Observable<AttestationTravail> {
    const params = new HttpParams().set('nouvelEtat', nouvelEtat);
    return this.http.put<AttestationTravail>(`${this.apiUrl}/${attestationId}/etat`, {}, { params });
  }

  obtenirToutesLesAttestations(): Observable<AttestationTravail[]> {
    return this.http.get<AttestationTravail[]>(`${this.apiUrl}/toutes`);
  }
}
