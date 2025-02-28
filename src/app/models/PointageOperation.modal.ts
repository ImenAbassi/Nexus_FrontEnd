

  export interface PointageOperation {
    id: number; // ID généré automatiquement par le backend
    compagne: string; // Champ supplémentaire (facultatif)
    heure: any; // Heure au format ISO (ex : "2023-10-05T14:30:00")
    type: string;
}