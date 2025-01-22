import { User } from './user.model'; // Assurez-vous d'importer l'interface User
import { Fonction } from './fonction.model'; // Assurez-vous d'importer l'interface Fonction
import { Compagne } from './Compagne.model';

export interface UserCompagne {
  id?: number; // Optionnel car généré automatiquement
  userId?: number; // Optionnel, référence à l'utilisateur
  user?: User; // Référence à l'objet User
  compagneId?: number; // Optionnel, référence à la campagne
  compagne?: Compagne; // Référence à l'objet Compagne
  supervisorId?: number; // Optionnel, référence au superviseur
  supervisor?: User; // Référence à l'objet User pour le superviseur
  projectLeaderId?: number; // Optionnel, référence au chef de projet
  projectLeader?: User; // Référence à l'objet User pour le chef de projet
  fonction: Fonction; // Fonction de l'utilisateur dans la campagne
  commentaire?: string; // Commentaire sur l'association
  dateAffectation: Date | null; // Date d'affectation
  dateFinAffectation: Date | null; // Date de fin d'affectation
  dateHeureFormation: Date | null; // Date et heure de formation
  role?:any;
}