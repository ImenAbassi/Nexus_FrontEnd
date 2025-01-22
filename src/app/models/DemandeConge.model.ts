import { TypeConge } from "./type-conge.model";
import { User } from "./user.model";

export class DemandeConge {
 
    id: number= 0; 
  typeConge?: TypeConge;
  dateCreation?: Date;
  dateDebut?: Date;
  dateFin?: Date;
  etatSuperviseur?: string;
  etatChefProjet?: string;
  etatRH?: string;
  user?: User;
  raison?: string;
  nbreJours?: number;
  }