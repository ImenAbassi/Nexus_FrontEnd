import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/action-type.model';
import { ActionTypeService } from 'src/app/services/action-type.service';

@Component({
  selector: 'app-gestion-type-action',
  templateUrl: './gestion-type-action.component.html',
  styleUrls: ['./gestion-type-action.component.css']
})
export class GestionTypeActionComponent implements OnInit {
  actionTypes: ActionType[] = [];
  selectedActionType: ActionType = { id: 0, libelle: '' };
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private actionTypeService: ActionTypeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllActionTypes();
  }

  // Récupérer tous les types d'action
  getAllActionTypes(): void {
    this.actionTypeService.getAllActionTypes().subscribe(
      (data) => {
        this.actionTypes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des types d\'actions:', error);
      }
    );
  }

  // Ouvrir le modal pour ajouter ou modifier un type d'action
  openModal(content: any, mode: string, actionType?: ActionType): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Type d\'Action';
      this.modalButtonLabel = 'Ajouter';
      this.selectedActionType = { id: 0, libelle: '' };
    } else if (mode === 'edit' && actionType) {
      this.modalTitle = 'Modifier le Type d\'Action';
      this.modalButtonLabel = 'Modifier';
      this.selectedActionType = { ...actionType };
    }
    this.modalService.open(content, { centered: true });
  }

  // Enregistrer un type d'action (ajout ou modification)
  saveActionType(modal: any): void {
    if (this.selectedActionType.id === 0) {
      // Ajouter un nouveau type d'action
      this.actionTypeService.createActionType(this.selectedActionType).subscribe(
        () => {
          this.getAllActionTypes();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du type d\'action:', error);
        }
      );
    } else {
      // Modifier un type d'action existant
      this.actionTypeService.updateActionType(this.selectedActionType.id, this.selectedActionType).subscribe(
        () => {
          this.getAllActionTypes();
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du type d\'action:', error);
        }
      );
    }
  }

  // Supprimer un type d'action
  deleteActionType(id: number): void {
    this.actionTypeService.deleteActionType(id).subscribe(
      () => {
        this.getAllActionTypes();
      },
      (error) => {
        console.error('Erreur lors de la suppression du type d\'action:', error);
      }
    );
  }
}
