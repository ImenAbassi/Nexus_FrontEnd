import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fonction } from 'src/app/models/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';

@Component({
  selector: 'app-gestion-fonction',
  templateUrl: './gestion-fonction.component.html',
  styleUrls: ['./gestion-fonction.component.css']
})
export class GestionFonctionComponent implements OnInit {
  paysList: Fonction[] = [];
  selectedPays: Fonction = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: FonctionService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllFonctions().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Fonctions:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: Fonction): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter une Fonction';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier la Fonction';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createFonction(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Fonction:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateFonction(this.selectedPays.id, this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du Fonction:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.paysService.deleteFonction(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du Fonction:', error);
      }
    );
  }
}

