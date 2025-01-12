import { Compagne } from "./Compagne.model";

export interface Planning {
    id?: number;
    horaireDebut:string;
    horaireFin: string;
    compagnes?: Compagne[];
}