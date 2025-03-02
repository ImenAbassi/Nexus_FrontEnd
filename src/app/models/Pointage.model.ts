
export class Pointage {
  
    id?: number;
    userId: number = 0;
    user: any ;
    userName: string = '';
    retard: number = 0;
    totalHeure: number = 0;
    datePointage: any = '';
    etatDemande: string = 'EN_ATTENTE';
    listOperation:any[]=[];
}