import { Compagne } from "./Compagne.model";
import { EtatDemande, User } from "./user.model";

export class AutorisationSortie {
    id?: any;
    dateCreation?: Date;
    dateDebut?: Date;
    dateFin?: Date;
    heureDebut?: string;
    heureFin?: string;
    nbreHeure?: number;
    utilisateur?: User;
    compagne?: Compagne;
    etatSuperviseur?: string;
    etatChefProjet?: string;
    etatRH?: string;
    raison?: string;
  
    constructor(
      id?: any,
      dateCreation?: Date,
      dateDebut?: Date,
      dateFin?: Date,
      heureDebut?: string,
      heureFin?: string,
      nbreHeure?: number,
      utilisateur?: User,
      compagne?: Compagne,
      etatSuperviseur?: string ,
      etatChefProjet?: string ,
      etatRH?: string ,
      raison?: string,
    ) {
      this.id = id;
      this.dateCreation = dateCreation;
      this.dateDebut = dateDebut;
      this.dateFin = dateFin;
      this.heureDebut = heureDebut;
      this.heureFin = heureFin;
      this.nbreHeure = nbreHeure;
      this.utilisateur = utilisateur;
      this.compagne = compagne;
      this.etatSuperviseur = etatSuperviseur;
      this.etatChefProjet = etatChefProjet;
      this.etatRH = etatRH;
      this.raison = raison;
    }
}