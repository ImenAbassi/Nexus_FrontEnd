import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeureDepart } from 'src/app/models/heure-depart.model';
import { HeureDepartService } from 'src/app/services/heure-depart.service';

@Component({
  selector: 'app-gestion-heure-depart',
  templateUrl: './gestion-heure-depart.component.html',
  styleUrls: ['./gestion-heure-depart.component.css']
})
export class GestionHeureDepartComponent implements OnInit {
  paysList: HeureDepart[] = [];
  selectedPays: HeureDepart = { id: 0, heure: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: HeureDepartService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllHeureDeparts().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: HeureDepart): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Pays';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, heure: '' };
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
      this.paysService.createHeureDepart(this.selectedPays).subscribe(
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
      this.paysService.updateHeureDepart(this.selectedPays.id, this.selectedPays).subscribe(
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
    this.paysService.deleteHeureDepart(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du pays:', error);
      }
    );
  }
}
