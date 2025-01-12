import { Component } from '@angular/core';
import { AutorisationSortie } from 'src/app/models/user.model';
import { AutorisationSortieService } from 'src/app/services/autorisation-sortie.service';

@Component({
  selector: 'app-list-sortie',
  templateUrl: './list-sortie.component.html',
  styleUrls: ['./list-sortie.component.css']
})
export class ListSortieComponent {
  autorisationSortie: AutorisationSortie = {
    dateDebut: new Date(),
    dateFin: new Date(),
    heureDebut: '',
    heureFin: '',
    nbreHeure: 0,
    raison: '',
    historique: [],
  };

  constructor(private autorisationSortieService: AutorisationSortieService) {}

  // Méthode pour soumettre la demande de congé
  onSubmit() {
    this.autorisationSortieService.creerDemande(this.autorisationSortie).subscribe(
      (response) => {
        alert('Demande de congé enregistrée avec succès!');
        // Vous pouvez ajouter des redirections ou réinitialiser le formulaire ici
      },
      (error) => {
        console.error('Erreur lors de la demande de congé:', error);
        alert('Erreur lors de l\'enregistrement de la demande.');
      }
    );
  }
}