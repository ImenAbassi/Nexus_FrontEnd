import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeAttestation } from 'src/app/models/type-attestation.model';
import { TypeAttestationService } from 'src/app/services/type-attestation.service';

@Component({
  selector: 'app-gestion-type-attestation',
  templateUrl: './gestion-type-attestation.component.html',
  styleUrls: ['./gestion-type-attestation.component.css']
})
export class GestionTypeAttestationComponent  implements OnInit {
  paysList: TypeAttestation[] = [];
  selectedPays: TypeAttestation = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: TypeAttestationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllTypeAttestations().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des types:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: TypeAttestation): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Type Attestation ';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier le Type Attestation';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createTypeAttestation(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Type Attestation:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateTypeAttestation(this.selectedPays.id, this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du Type Attestation:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.paysService.deleteTypeAttestation(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du Type Attestation:', error);
      }
    );
  }
}



