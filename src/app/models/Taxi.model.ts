import { EtatDemande } from "./user.model";

export interface Taxi {
    id: number;
    user: any;
    localisationArrivee: string;
    heureDepart: string;
    etatDemande: EtatDemande;
    dateCreation?:any;
  }