import { Sexe } from "./sexe.model";

export interface CandidatDTO {
    id?: number;
    nom: string;
    prenom: string;
    sexe: Sexe; // Supposons que Sexe est une chaîne de caractères (peut être une énumération si nécessaire)
    cin: string;
    dateHeureFormation?: Date; // Add this field

    adresseMail: string;
    telPortable1: string;
    compagne?: CompagneDTO; // Supposons que CompagneDTO est une autre interface
  }
  
  export interface CompagneDTO {
    id?: number;
    nom: string;
    // Ajoutez d'autres propriétés si nécessaire
  }