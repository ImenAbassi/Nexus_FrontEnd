import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Langue } from 'src/app/models/langue.model';
import { LangueService } from 'src/app/services/langue.service';


@Component({
  selector: 'app-gestion-langues',
  templateUrl: './gestion-langues.component.html',
  styleUrls: ['./gestion-langues.component.css'],
})
export class GestionLanguesComponent implements OnInit {
  langues: Langue[] = [];
  selectedLangue: Langue = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private langueService: LangueService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllLangues();
  }

  // Récupérer toutes les langues
  getAllLangues(): void {
    this.langueService.getAllLangues().subscribe(
      (data) => {
        this.langues = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des langues:', error);
      }
    );
  }

  // Ouvrir le modal pour ajouter ou modifier
  openModal(content: any, mode: string, langue?: Langue): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter une Langue';
      this.modalButtonLabel = 'Ajouter';
      this.selectedLangue = { id: 0, nom: '' };
    } else if (mode === 'edit' && langue) {
      this.modalTitle = 'Modifier la Langue';
      this.modalButtonLabel = 'Modifier';
      this.selectedLangue = { ...langue };
    }
    this.modalService.open(content, { centered: true });
  }

  // Enregistrer une langue (ajout ou modification)
  saveLangue(modal: any): void {
    if (this.selectedLangue.id === 0) {
      // Ajouter une nouvelle langue
      this.langueService.createLangue(this.selectedLangue).subscribe(
        () => {
          this.getAllLangues();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la langue:', error);
        }
      );
    } else {
      // Modifier une langue existante
      this.langueService.updateLangue(this.selectedLangue.id, this.selectedLangue).subscribe(
        () => {
          this.getAllLangues();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la langue:', error);
        }
      );
    }
  }

  // Supprimer une langue
  deleteLangue(id: number): void {
    this.langueService.deleteLangue(id).subscribe(
      () => {
        this.getAllLangues();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la langue:', error);
      }
    );
  }
}
