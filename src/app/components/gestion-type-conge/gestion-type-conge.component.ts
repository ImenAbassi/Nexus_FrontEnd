import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeConge } from 'src/app/models/type-conge.model';
import { TypeCongeService } from 'src/app/services/type-conge.service';

@Component({
  selector: 'app-gestion-type-conge',
  templateUrl: './gestion-type-conge.component.html',
  styleUrls: ['./gestion-type-conge.component.css']
})
export class GestionTypeCongeComponent implements OnInit {
  paysList: TypeConge[] = [];
  selectedPays: TypeConge = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: TypeCongeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllTypeConges().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Types Congés:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: TypeConge): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Type Congé';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier le Type Congé';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createTypeConge(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Type Congé:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateTypeConge(this.selectedPays.id, this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du Type Congé:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.paysService.deleteTypeConge(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du Type Congé:', error);
      }
    );
  }
}


