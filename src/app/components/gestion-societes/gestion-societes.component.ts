import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Societe } from 'src/app/models/Societe.model';
import { SocieteService } from 'src/app/services/societe.service';
@Component({
  selector: 'app-gestion-societe',
  templateUrl: './gestion-societes.component.html',
  styleUrls: ['./gestion-societes.component.css'],
})
export class GestionSocieteComponent implements OnInit {
  societes: Societe[] = [];
  societe: Societe = { id: undefined, nom: '' };
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private societeService: SocieteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getSocietes();
  }

  getSocietes(): void {
    this.societeService.getAllSocietes().subscribe(
      (data) => (this.societes = data),
      (error) => console.error('Erreur lors de la récupération des sociétés', error)
    );
  }

  openModal(content: any, action: string, societe?: Societe): void {
    this.modalTitle = action === 'add' ? 'Ajouter Société' : 'Modifier Société';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    this.societe = societe ? { ...societe } : { id: undefined, nom: '' };
    this.modalService.open(content);
  }

  saveSociete(modal: any): void {
    if (this.societe.id) {
      this.societeService.updateSociete(this.societe).subscribe(
        () => {
          this.getSocietes();
          alert('Société mise à jour avec succès!');
          modal.close();
        },
        (error) => console.error('Erreur lors de la mise à jour de la société', error)
      );
    } else {
      this.societeService.createSociete(this.societe).subscribe(
        () => {
          this.getSocietes();
          alert('Société ajoutée avec succès!');
          modal.close();
        },
        (error) => console.error('Erreur lors de l\'ajout de la société', error)
      );
    }
  }

  deleteSociete(id: number | undefined): void {
    if (id) {
      this.societeService.deleteSociete(id).subscribe(
        () => {
          this.getSocietes();
          alert('Société supprimée avec succès!');
        },
        (error) => console.error('Erreur lors de la suppression de la société', error)
      );
    }
  }
}
