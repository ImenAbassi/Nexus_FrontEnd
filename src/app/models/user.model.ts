// user.model.ts

import { Compagne } from "./Compagne.model";
import { Fonction } from "./fonction.model";

export enum ActionType {
  DEMISSION = 'DEMISSION',
  LOW_PERFORMERS = 'LOW_PERFORMERS',
  REAFFECTATION = 'REAFFECTATION',
  AB_DE_POSTE = 'AB_DE_POSTE',
  COMPORTEMENT = 'COMPORTEMENT',
  Ramps_Down = 'Ramps_Down'
}

export enum Cible {
  B2B = 'B2B',
  B2C = 'B2C'
}

export enum EtatCivil {
  CELIBATAIRE = 'CELIBATAIRE',
  MARIE = 'MARIE',
  DIVORCE = 'DIVORCE'
}

export enum EtatDemande {
  EN_ATTENTE = 'EN_ATTENTE',
  APPROUVEE = 'APPROUVEE',
  REJETEE = 'REJETEE'
}

export enum EtatUser {
  FORMATION = 'FORMATION',
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  DESACTIVE = 'DESACTIVE',
  INDISPONIBLE = 'INDISPONIBLE',
  BLACKLIST = 'BLACKLIST',
  TELETRAVAIL = 'TELETRAVAIL'
}


export enum Langue {
  FRANCAIS = 'FRANCAIS',
  ANGLAIS = 'ANGLAIS',
  ALLEMAND = 'ALLEMAND',
  ITALIEN = 'ITALIEN',
  ESPAGNOL = 'ESPAGNOL',
  ARABE = 'ARABE',
  BILINGUE = 'BILINGUE'
}

export enum Pays {
  FRANCE = 'FRANCE',
  ALLEMAGNE = 'ALLEMAGNE',
  ITALIE = 'ITALIE',
  SUISSE = 'SUISSE',
  UK = 'UK',
  ESPAGNE = 'ESPAGNE'
}

export enum Sexe {
  MASCULIN = 'MASCULIN',
  FEMININ = 'FEMININ'
}

export enum TypeAttestation {
  LEGALISE = 'LEGALISE',
  NON_LEGALISE = 'NON_LEGALISE'
}

export enum TypeConge {
  paye = 'paye',
  sans_solde = 'sans_solde'
}

export enum TypeContrat {
  CDI = 'CDI',
  SIVP = 'SIVP'
}

export enum Typologie {
  TELEVENTE = 'TELEVENTE',
  SERVICE_CLIENT = 'SERVICE_CLIENT',
  PRISE_DE_RDV = 'PRISE_DE_RDV',
  GENERATION_DE_LEAD = 'GENERATION_DE_LEAD',
  SONDAGE = 'SONDAGE',
  HOTLINE_TECHNIQUE = 'HOTLINE_TECHNIQUE',
  TELEMARKETING = 'TELEMARKETING',
  PRISE_DE_COMMANDES = 'PRISE_DE_COMMANDES',
  SONDAGES_ET_BAROMETRES = 'SONDAGES_ET_BAROMETRES',
  RECOUVREMENT = 'RECOUVREMENT',
  BACKOFFICE = 'BACKOFFICE',
  CREATION_DE_TRAFFIC = 'CREATION_DE_TRAFFIC',
  QUALIFICATION_DE_FICHES = 'QUALIFICATION_DE_FICHES',
  AUTRES = 'AUTRES'
}

export enum TypologieCanal {
  APPELS_ENTRANTS = 'APPELS_ENTRANTS',
  APPELS_SORTANTS = 'APPELS_SORTANTS',
  CHAT_EMAIL = 'CHAT_EMAIL',
  MULTICANAL = 'MULTICANAL',
  AUTRES = 'AUTRES'
}

export interface Avance { id: number; dateCreation: Date; dateDemande: Date; montant: number; etatDemande: EtatDemande; user: User; } export interface Enfant { idEnfant: number; prenom: string; sexe: Sexe; dateNaissance: Date; parent: User; } export interface Societe { id: number; nom: string; }

export interface MouvementHistorique {
  // Définir les champs pour l'entité MouvementHistorique
}

export interface DemandeConge { id: number; type: TypeConge; dateCreation: Date; dateDebut: Date; dateFin: Date; etatSuperviseur: EtatDemande; etatChefProjet: EtatDemande; etatRH: EtatDemande; user: User; raison: string; nbreJours: number; historique: ValidationHistorique[]; }
export interface Planning {
  id?: number;
  horaireDebut:
  string;
  horaireFin: string;
  compagnes?: Compagne[];
}
export interface JourFerie {
  id: number;
  date: Date;
  description: string;
  pays: Pays;
  mois?: number;
  semaineDansMois?: number;
  jourSemaine?: DayOfWeek;
}
export enum DayOfWeek { SUNDAY = 'SUNDAY', MONDAY = 'MONDAY', TUESDAY = 'TUESDAY', WEDNESDAY = 'WEDNESDAY', THURSDAY = 'THURSDAY', FRIDAY = 'FRIDAY', SATURDAY = 'SATURDAY' }
export interface UserCompagne {
  id?: number;
  userId?: number;
  user?: User;
  compagneId?: number;
  supervisorId?: number;
  projectLeaderId?: number;
  fonction: Fonction;
  commentaire?: string;
  dateAffectation?: Date;
  dateFinAffectation?: Date;
  dateHeureFormation?: Date;
}
/*
export interface Compagne {
  id?: number;
  logo?: string;
  nom: string;
  client: string;
  Projetclient: string;
  cible: Cible;
  pays: Pays;
  description: string;
  langue: Langue;
  typologie: Typologie;
  salaireBase: number;
  salaire2: number;
  salaire3: number;
  typologiecanal: TypologieCanal;
  plannings: Planning[];
  joursFeries?: JourFerie[];
  userCompagnes?: UserCompagne[];
}*/
export interface ValidationHistorique {
  id: number;
  autorisationSortie: AutorisationSortie;
  demandeConge: DemandeConge;
  role: string;
  etat: EtatDemande;
  dateValidation: Date;
}

export interface UserCompagneDTO {

  userId?: number;
  user?: User;
  compagneId?: number;
  supervisorId?: number;
  projectLeaderId?: number;
  fonction: Fonction;
  commentaire?: string;
  dateAffectation?: Date;
  dateFinAffectation?: Date;
  dateHeureFormation?: Date;
}


export interface AutorisationSortie {
  id?: number;
  dateCreation?: Date;
  dateDebut: Date;
  dateFin: Date;
  heureDebut: string;
  heureFin: string;
  nbreHeure: number;
  utilisateur?: User;
  compagne?: Compagne;
  etatSuperviseur?: EtatDemande;
  etatChefProjet?: EtatDemande;
  etatRH?: EtatDemande;
  raison: string;
  historique: ValidationHistorique[];
}

export interface AttestationTravail {
  id?: number;
  dateCreation?: Date;
  utilisateurId?: number;
  motif?: string;
  etat?: EtatDemande;
  type?: TypeAttestation; 
  dateSouhaitee?: Date;
   reference?: string;
}
export interface User {
  idUser?: number;
  prenom: string;
  nom: string;
  nomJeuneFille?: string;
  etatCivil?: EtatCivil;
  sexe?: Sexe;
  etatActuel?: EtatUser;
  dateNaissance?: Date;
  lieuNaissance?: string;
  cin: string;
  delivreeLe?: Date;
  delivreeA?: string;
  adresseMail?: string;
  adresseMailPro?: string;
  adresseCIN?: string;
  adressePersonnelle2?: string;
  adressePersonnelle3?: string;
  codePostal?: string;
  ville?: string;
  telFixe?: string;
  telPortable1: string;
  telPortable2?: string;
  nationalite?: string;
  cnssCnrps?: string;
  banque?: string;
  agence?: string;
  rib?: string;
  typeContrat?: TypeContrat;
  matricule?: string;
  photoCin?: Blob;
  description?: string;
  password: string;
  dateEntree?: Date;
  dateDebutContrat?: Date;
  dateFinContrat?: Date;
  photoDiplome?: Blob;
  photoProfil?: Blob;
  salaire?: number;
  enfants?: Enfant[];
  societe?: Societe;
  MouvementHistoriques?: MouvementHistorique[];
  demandesConge?: DemandeConge[];
  userCompagnes?: UserCompagne[];
  autorisationSorties?: AutorisationSortie[];
}
export interface Permission {
  id?: number;
  name: string;
}

export interface RolePermission {
  id?: number;
  role: string;
  permission: Permission;
}
