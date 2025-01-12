import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeContrat } from 'src/app/models/type-contrat.model';
import { TypeContratService } from 'src/app/services/type-contrat.service';

@Component({
  selector: 'app-gestion-type-contrat',
  templateUrl: './gestion-type-contrat.component.html',
  styleUrls: ['./gestion-type-contrat.component.css']
})
export class GestionTypeContratComponent implements OnInit {
  paysList: TypeContrat[] = [];
  selectedPays: TypeContrat = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: TypeContratService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllTypeContrats().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: TypeContrat): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Pays';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier le Pays';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createTypeContrat(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du pays:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateTypeContrat(this.selectedPays.id, this.selectedPays).subscribe(
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
    this.paysService.deleteTypeContrat(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du pays:', error);
      }
    );
  }
}


