import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Planning } from 'src/app/models/planning.model';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-gestion-planning',
  templateUrl: './gestion-planning.component.html',
  styleUrls: ['./gestion-planning.component.css']
})
export class GestionPlanningComponent  implements OnInit {
  plannings: Planning[] = [];
  currentPage: number = 1;
  planning: Planning = { horaireDebut: '', horaireFin: ''};
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private planningService: PlanningService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getPlannings();
  }

  // Récupérer les sites
  getPlannings(): void {
    this.planningService.getAllPlannings().subscribe(
      (data) => {
        this.plannings = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des plannings', error);
      }
    );
  }

  // Afficher le modal
  openModal(content: any, action: string, planning?: Planning): void {
    this.modalTitle = action === 'add' ? 'Ajouter un Planning' : 'Modifier un Planning';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    this.planning = planning ? { ...planning } : { horaireDebut: '', horaireFin: ''};

    // Ouvre le modal
    this.modalService.open(content, { ariaLabelledBy: 'planningModalLabel' });
  }

  // Sauvegarder le site
  saveSite(modal: any): void {
    if (this.planning.id) {
      this.planningService.updatePlanning(this.planning).subscribe(
        () => {
          this.getPlannings();
          alert('Planning mis à jour avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du planning', error);
        }
      );
    } else {
      this.planningService.createPlanning(this.planning).subscribe(
        () => {
          this.getPlannings();
          alert('Planning ajouté avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du planning', error);
        }
      );
    }
  }

  // Supprimer un site
  deleteSite(id: number | undefined): void {
    if (id) {
      this.planningService.deletePlanning(id).subscribe(
        () => {
          this.getPlannings();
          alert('Planning supprimé avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression du planning', error);
        }
      );
    }
  }
}
