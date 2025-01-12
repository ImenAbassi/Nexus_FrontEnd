import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pays } from 'src/app/models/pays.model';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-gestion-pays',
  templateUrl: './gestion-pays.component.html',
  styleUrls: ['./gestion-pays.component.css'],
})
export class GestionPaysComponent implements OnInit {
  paysList: Pays[] = [];
  selectedPays: Pays = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: PaysService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllPays().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: Pays): void {
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
      this.paysService.createPays(this.selectedPays).subscribe(
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
      this.paysService.updatePays(this.selectedPays.id, this.selectedPays).subscribe(
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
    this.paysService.deletePays(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du pays:', error);
      }
    );
  }
}
