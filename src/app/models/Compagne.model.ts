import { Cible } from "./cible.model";
import { Langue } from "./langue.model";
import { Pays } from "./pays.model";
import { Typologie } from "./typologie.model";
import { TypologieCanal } from "./TypologieCanal.model";
import { Planning } from "./user.model";

export class Compagne {
  id?: number;
  logo?: string; // Le logo sera probablement converti en chaîne de caractères (base64) dans Angular
  nom?: string;
  client?: string;
  description?: string;
  projetclient?: string;

  cible?: Cible;
  pays?: Pays;
  langue?: Langue;
  typologie?: Typologie;
  salaireBase?: number;
  salaire2?: number;
  salaire3?: number;
  typologieCanal?: TypologieCanal;
  plannings: Planning[] =[];
 // joursFeries: JourFerie[] =[];

  // Constructeur pour initialiser l'objet Compagne à partir d'un objet 'compagne' reçu
  constructor(compagne?: any) {
    this.id = compagne?.id;
    this.logo = compagne?.logo;
    this.nom = compagne?.nom;
    this.client = compagne?.client;
    this.description = compagne?.description;
    this.projetclient = compagne?.projetclient;
    this.cible = compagne?.cible;
    this.pays = compagne?.pays;
    this.langue = compagne?.langue;
    this.typologie = compagne?.typologie;
    this.salaireBase = compagne?.salaireBase;
    this.salaire2 = compagne?.salaire2;
    this.salaire3 = compagne?.salaire3;
    this.typologieCanal = compagne?.typologieCanal;
    //this.joursFeries = compagne.joursFeries || [];  // Correction ici
   // this.plannings = compagne?.plannings || [];
  }
}
