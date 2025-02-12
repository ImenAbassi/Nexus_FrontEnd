import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sexe } from 'src/app/models/sexe.model';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-gestion-sexe',
  templateUrl: './gestion-sexe.component.html',
  styleUrls: ['./gestion-sexe.component.css']
})
export class GestionSexeComponent  implements OnInit {
  paysList: Sexe[] = [];
  selectedPays: Sexe = { id: 0, nom: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private paysService: SexeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllSexes().subscribe(
      (data) => {
        this.paysList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sexes:', error);
      }
    );
  }

  openModal(content: any, mode: string, pays?: Sexe): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un sexe';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPays = { id: 0, nom: '' };
    } else if (mode === 'edit' && pays) {
      this.modalTitle = 'Modifier le sexe';
      this.modalButtonLabel = 'Modifier';
      this.selectedPays = { ...pays };
    }
    this.modalService.open(content, { centered: true });
  }

  savePays(modal: any): void {
    if (this.selectedPays.id === 0) {
      // Ajouter un pays
      this.paysService.createSexe(this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du sexe:', error);
        }
      );
    } else {
      // Modifier un pays
      this.paysService.updateSexe(this.selectedPays.id, this.selectedPays).subscribe(
        () => {
          this.getAllPays();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du sexe:', error);
        }
      );
    }
  }

  deletePays(id: number): void {
    this.paysService.deleteSexe(id).subscribe(
      () => {
        this.getAllPays();
      },
      (error) => {
        console.error('Erreur lors de la suppression du sexe:', error);
      }
    );
  }
}

