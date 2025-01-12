import { JourSemaine } from "./jour-semaine.model";
import { Pays } from "./pays.model";

export class JourFerie {
  id?: number; // Facultatif pour la création
  date?: string; // Format ISO pour les jours fixes
  description?: string;
  pays?: Pays; // Relation avec Pays
  mois?: number; // Pour les jours récurrents
  semaineDansMois?: number; // Semaine spécifique du mois
  jourSemaine?: JourSemaine; 
  constructor(jourferie?: any) {
    this.id = jourferie?.id;
    this.date = jourferie?.date;
    this.description = jourferie?.description;
    this.pays = jourferie?.pays;
    this.mois = jourferie?.mois;
    this.semaineDansMois = jourferie?.semaineDansMois;
    this.jourSemaine = jourferie?.jourSemaine;
  }
}