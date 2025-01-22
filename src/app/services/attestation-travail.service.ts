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

  creerAttestation(attestation: AttestationTravail): Observable<AttestationTravail> {
    return this.http.post<AttestationTravail>(`${this.apiUrl}/creer`, attestation);
  }

  obtenirAttestationsParUtilisateur(userId: number): Observable<AttestationTravail[]> {
    return this.http.get<AttestationTravail[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  mettreAJourEtat(attestationId: number): Observable<AttestationTravail> {
    return this.http.put<AttestationTravail>(`${this.apiUrl}/${attestationId}/etat`, {});
  }

  obtenirToutesLesAttestations(): Observable<AttestationTravail[]> {
    return this.http.get<AttestationTravail[]>(`${this.apiUrl}/toutes`);
  }
}
