import { Component, OnInit } from '@angular/core';
import { Typologie } from 'src/app/models/typologie.model';
import { TypologieService } from 'src/app/services/typologie.service';

@Component({
  selector: 'app-gestion-typologie',
  templateUrl: './gestion-typologie.component.html',
  styleUrls: ['./gestion-typologie.component.css']
})
export class GestionTypologieComponent implements OnInit {
  typologies: Typologie[] = [];
  typologie: Typologie = { id: 0, nom: '', description: '' }; // Pour le formulaire modal
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(private typologieService: TypologieService) {}

  ngOnInit(): void {
    this.getAllTypologies();
  }

  // Récupérer toutes les typologies
  getAllTypologies(): void {
    this.typologieService.getAllTypologies().subscribe({
      next: (data) => (this.typologies = data),
      error: (err) => console.error('Erreur lors de la récupération des typologies', err)
    });
  }

  // Ouvrir le modal pour ajouter ou modifier une typologie
  openModal(modal: any, action: string, typologie?: Typologie): void {
    if (action === 'add') {
      this.modalTitle = 'Ajouter une Typologie';
      this.modalButtonLabel = 'Ajouter';
      this.typologie = { id: 0, nom: '', description: '' };
    } else if (action === 'edit' && typologie) {
      this.modalTitle = 'Modifier une Typologie';
      this.modalButtonLabel = 'Mettre à jour';
      this.typologie = { ...typologie };
    }
    modal.open();
  }

  // Enregistrer une typologie (ajouter ou modifier)
  saveTypologie(modal: any): void {
    if (this.typologie.id === 0) {
      // Ajouter
      this.typologieService.createTypologie(this.typologie).subscribe({
        next: (data) => {
          this.typologies.push(data);
          modal.dismiss();
        },
        error: (err) => console.error('Erreur lors de l\'ajout de la typologie', err)
      });
    } else {
      // Modifier
      this.typologieService.updateTypologie(this.typologie.id, this.typologie).subscribe({
        next: (updatedTypologie) => {
          const index = this.typologies.findIndex((t) => t.id === updatedTypologie.id);
          if (index > -1) this.typologies[index] = updatedTypologie;
          modal.dismiss();
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la typologie', err)
      });
    }
  }

  // Supprimer une typologie
  deleteTypologie(id: number): void {
    this.typologieService.deleteTypologie(id).subscribe({
      next: () => {
        this.typologies = this.typologies.filter((t) => t.id !== id);
      },
      error: (err) => console.error('Erreur lors de la suppression de la typologie', err)
    });
  }
}
