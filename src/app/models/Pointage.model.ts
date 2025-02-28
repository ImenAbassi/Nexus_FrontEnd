import { PointageOperation } from "./PointageOperation.modal";

export interface Pointage {
    id: number;
    datePointage: any; // Date du pointage
    user: any; // Utilisateur associé au pointage
    heuresTravaillees: number;
    operations: PointageOperation[];
    etatDemande:any;
}