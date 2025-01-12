import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypologieCanal } from 'src/app/models/TypologieCanal.model';
import { TypologieCanalService } from 'src/app/services/typologie-canal.service';

@Component({
  selector: 'app-gestion-typologie-canal',
  templateUrl: './gestion-typologie-canal.component.html',
  styleUrls: ['./gestion-typologie-canal.component.css']
})
export class GestionTypologieCanalComponent implements OnInit {
  typologies: TypologieCanal[] = [];
  currentPage: number = 1;
  typologie: TypologieCanal = { nom: '', description: '' };
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private typologieCanalService: TypologieCanalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTypologies();
  }

  // Récupérer les typologies
  getTypologies(): void {
    this.typologieCanalService.getAllTypologieCanaux().subscribe(
      (data) => {
        this.typologies = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des typologies', error);
      }
    );
  }

  // Afficher le modal
  openModal(content: any, action: string, typologie?: TypologieCanal): void {
    this.modalTitle = action === 'add' ? 'Ajouter Typologie' : 'Modifier Typologie';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    this.typologie = typologie ? { ...typologie } : { nom: '', description: '' };

    // Ouvre le modal
    this.modalService.open(content, { ariaLabelledBy: 'typologieModalLabel' });
  }

  // Sauvegarder la typologie
  saveTypologie(modal: any): void {
    if (this.typologie.id) {
      this.typologieCanalService.updateTypologieCanal(this.typologie).subscribe(
        () => {
          this.getTypologies();
          alert('Typologie mise à jour avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la typologie', error);
        }
      );
    } else {
      this.typologieCanalService.createTypologieCanal(this.typologie).subscribe(
        () => {
          this.getTypologies();
          alert('Typologie ajoutée avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la typologie', error);
        }
      );
    }
  }

  // Supprimer une typologie
  deleteTypologie(id: number | undefined): void {
    if (id) {
      this.typologieCanalService.deleteTypologieCanal(id).subscribe(
        () => {
          this.getTypologies();
          alert('Typologie supprimée avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la typologie', error);
        }
      );
    }
  }
}
