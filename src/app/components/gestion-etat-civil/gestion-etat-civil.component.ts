import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtatCivil } from 'src/app/models/etat-civil.model';
import { EtatCivilService } from 'src/app/services/etat-civil.service';

@Component({
  selector: 'app-gestion-etat-civil',
  templateUrl: './gestion-etat-civil.component.html',
  styleUrls: ['./gestion-etat-civil.component.css']
})
export class GestionEtatCivilComponent implements OnInit {
  paysList: EtatCivil[] = [];
  selectedPays: EtatCivil = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: EtatCivilService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllEtatCivils().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Etats civil:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: EtatCivil): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Etat civil';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier Etat civil';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createEtatCivil(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout des Etats civil:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateEtatCivil(this.selectedPays.id, this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du pays:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.paysService.deleteEtatCivil(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du pays:', error);
      }
    );
  }
}

