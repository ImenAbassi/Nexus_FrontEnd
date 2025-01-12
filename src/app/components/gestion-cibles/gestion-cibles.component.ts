import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cible } from 'src/app/models/cible.model';
import { CibleService } from 'src/app/services/cible.service';


@Component({
  selector: 'app-gestion-cibles',
  templateUrl: './gestion-cibles.component.html',
  styleUrls: ['./gestion-cibles.component.css'],
})
export class GestionCiblesComponent implements OnInit {
  cibles: Cible[] = [];
  selectedCible: Cible = { id: 0, type: '', description: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private cibleService: CibleService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllCibles();
  }

  // Récupérer toutes les cibles
  getAllCibles(): void {
    this.cibleService.getAllCibles().subscribe(
      (data) => {
        this.cibles = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des cibles:', error);
      }
    );
  }

  // Ouvrir le modal pour ajouter ou modifier une cible
  openModal(content: any, mode: string, cible?: Cible): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter une Cible';
      this.modalButtonLabel = 'Ajouter';
      this.selectedCible = { id: 0, type: '', description: '' };
    } else if (mode === 'edit' && cible) {
      this.modalTitle = 'Modifier la Cible';
      this.modalButtonLabel = 'Modifier';
      this.selectedCible = { ...cible };
    }
    this.modalService.open(content, { centered: true });
  }

  // Enregistrer une cible (ajout ou modification)
  saveCible(modal: any): void {
    if (this.selectedCible.id === 0) {
      // Ajouter une nouvelle cible
      this.cibleService.createCible(this.selectedCible).subscribe(
        () => {
          this.getAllCibles();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la cible:', error);
        }
      );
    } else {
      // Modifier une cible existante
      this.cibleService.updateCible(this.selectedCible.id, this.selectedCible).subscribe(
        () => {
          this.getAllCibles();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la cible:', error);
        }
      );
    }
  }

  // Supprimer une cible
  deleteCible(id: number): void {
    this.cibleService.deleteCible(id).subscribe(
      () => {
        this.getAllCibles();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la cible:', error);
      }
    );
  }
}
