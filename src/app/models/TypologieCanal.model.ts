export class TypologieCanal {
    id?: number;
    nom?: string;
    description?: string;
  
    constructor(data?: Partial<TypologieCanal>) {
      this.id = data?.id;
      this.nom = data?.nom || 'Nom par défaut'; // Valeur par défaut
      this.description = data?.description || 'Description par défaut'; // Valeur par défaut
    }
  }
  