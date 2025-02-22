import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Privilege } from 'src/app/models/Privilege.model';
import { PrivilegeService } from 'src/app/services/PrivilegeService.service';

@Component({
  selector: 'app-gestion-privilege',
  templateUrl: './gestion-privilege.component.html',
  styleUrls: ['./gestion-privilege.component.css']
})
export class GestionPrivilegeComponent {
  privilegeList: Privilege[] = [];
  selectedPrivilege: Privilege = { id: 0, name: '' }; // Utilisez 'name' selon votre modèle
  modalTitle = '';
  modalButtonLabel = '';

  constructor(private service: PrivilegeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  // Récupère tous les privilèges depuis le service
  getAll(): void {
    this.service.getAllPrivileges().subscribe(
      (data) => {
        this.privilegeList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des privilèges:', error);
        alert('Une erreur est survenue lors de la récupération des privilèges.');
      }
    );
  }

  // Ouvre la modale en mode "ajout" ou "modification"
  openModal(content: any, mode: string, privilege?: Privilege): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Privilège';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPrivilege = { id: 0, name: '' }; // Réinitialiser les valeurs
    } else if (mode === 'edit' && privilege) {
      this.modalTitle = 'Modifier le Privilège';
      this.modalButtonLabel = 'Modifier';
      this.selectedPrivilege = { ...privilege }; // Copie de l'objet pour éviter les modifications directes
    } else {
      console.error('Mode non valide ou privilège manquant.');
      return;
    }

    this.modalService.open(content, { centered: true });
  }

  // Enregistre un nouveau privilège ou met à jour un privilège existant
  savePrivilege(modal: any): void {
    if (this.selectedPrivilege.id === 0) {
      // Ajouter un privilège
      this.service.createPrivilege(this.selectedPrivilege).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste
          modal.close(); // Fermer la modale
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du privilège:', error);
          alert('Une erreur est survenue lors de l\'ajout du privilège.');
        }
      );
    } else {
      // Modifier un privilège
      this.service.updatePrivilege(this.selectedPrivilege.id, this.selectedPrivilege).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste
          modal.close(); // Fermer la modale
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du privilège:', error);
          alert('Une erreur est survenue lors de la mise à jour du privilège.');
        }
      );
    }
  }

  // Supprime un privilège par ID
  deletePrivilege(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce privilège ?')) {
      this.service.deletePrivilege(id).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du privilège:', error);
          alert('Une erreur est survenue lors de la suppression du privilège.');
        }
      );
    }
  }
}