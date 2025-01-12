import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JourSemaine } from 'src/app/models/jour-semaine.model';
import { JourSemaineService } from 'src/app/services/jour-semaine.service';

@Component({
  selector: 'app-gestion-jours-semaine',
  templateUrl: './gestion-jours-semaine.component.html',
  styleUrls: ['./gestion-jours-semaine.component.css']
})
export class GestionJoursSemaineComponent implements OnInit {
  joursList: JourSemaine[] = [];
  selectedJour: JourSemaine = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private joursemaineService: JourSemaineService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllJours();
  }

  getAllJours(): void {
    this.joursemaineService.getAllJourSemaine().subscribe(
      (data) => {
        this.joursList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: JourSemaine): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Pays';
      this.modalButtonLabel = 'Ajouter';
      this.selectedJour = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier le Pays';
      this.modalButtonLabel = 'Modifier';
      this.selectedJour = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedJour.id === 0) {
      // Ajouter un pays
      this.joursemaineService.addJourSemaine(this.selectedJour).subscribe(
        () => {
          this.getAllJours();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du pays:', error);
        }
      );
    } else {
      // Modifier un pays
      this.joursemaineService.updateJourSemaine(this.selectedJour.id, this.selectedJour).subscribe(
        () => {
          this.getAllJours();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du pays:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.joursemaineService.deleteJourSemaine(id).subscribe(
      () => {
        this.getAllJours();
      },
      (error) => {
        console.error('Erreur lors de la suppression du pays:', error);
      }
    );
  }
}
