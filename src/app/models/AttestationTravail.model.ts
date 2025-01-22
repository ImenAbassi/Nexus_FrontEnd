// src/app/models/attestation-travail.model.ts

import { User } from './user.model'; // Assurez-vous d'importer le modèle User
import { TypeAttestation } from './type-attestation.model'; // Assurez-vous d'importer le modèle TypeAttestation

export class AttestationTravail {
  id?: number; // Identifiant de l'attestation
  typeAttestation?: TypeAttestation; // Type d'attestation
  dateSouhaitee?: Date; // Date souhaitée de récupération
  dateCreation?: Date; // Date de création de l'attestation
  etatDemande?: string; // État de la demande (EN_ATTENTE, APPROUVEE, REJETEE)
  motif?: string; // Motif de la demande
  reference?: string; // Référence de l'attestation
  utilisateur?: User; // Utilisateur associé à l'attestation

  constructor(
    id?: number,
    typeAttestation?: TypeAttestation,
    dateSouhaitee?: Date,
    dateCreation?: Date,
    etatDemande?: string,
    motif?: string,
    reference?: string,
    utilisateur?: User
  ) {
    this.id = id;
    this.typeAttestation = typeAttestation;
    this.dateSouhaitee = dateSouhaitee;
    this.dateCreation = dateCreation;
    this.etatDemande = etatDemande;
    this.motif = motif;
    this.reference = reference;
    this.utilisateur = utilisateur;
  }
}