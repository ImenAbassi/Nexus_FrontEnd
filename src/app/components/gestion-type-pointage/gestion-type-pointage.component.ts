import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypePointage } from 'src/app/models/Type-pointage.model';
import { TypePointageService } from 'src/app/services/type-pointage.service';

@Component({
  selector: 'app-gestion-type-pointage',
  templateUrl: './gestion-type-pointage.component.html',
  styleUrls: ['./gestion-type-pointage.component.css']
})
export class GestionTypePointageComponent {
privilegeList: TypePointage[] = [];
  selectedPrivilege: TypePointage = { id: 0, name: '' };
  modalTitle = '';
  modalButtonLabel = '';

  // Pagination variables
  itemsPerPage = 7;
  currentPage = 1;
  totalPages = 1;
  constructor(private service: TypePointageService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(
      (data) => {
        this.privilegeList = data;
        this.totalPages =data.length;
        this.currentPage = 1; // Reset to first page when data is refreshed
      },
      (error) => {
        console.error('Erreur lors de la récupération des privilèges:', error);
        alert('Une erreur est survenue lors de la récupération des privilèges.');
      }
    );
  }

  get paginatedPrivileges(): TypePointage[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.privilegeList.slice(start, end);
  }

  // Generate array of total pages
  get totalPagesArray(): number[] {
    return Array.from({ length: Math.ceil(this.privilegeList.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPagesArray.length) {
      this.currentPage = page;
    }
  }

  // Ouvre la modale en mode "ajout" ou "modification"
  openModal(content: any, mode: string, TypePointage?: TypePointage): void {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter un Type Pointage';
      this.modalButtonLabel = 'Ajouter';
      this.selectedPrivilege = { id: 0, name: '' }; // Réinitialiser les valeurs
    } else if (mode === 'edit' && TypePointage) {
      this.modalTitle = 'Modifier le Type Pointage';
      this.modalButtonLabel = 'Modifier';
      this.selectedPrivilege = { ...TypePointage }; // Copie de l'objet pour éviter les modifications directes
    } else {
      console.error('Mode non valide ou Type Pointage manquant.');
      return;
    }
    this.modalService.open(content, { centered: true });
  }

  save(modal: any): void {
    if (this.selectedPrivilege.id === 0) {
      this.service.create(this.selectedPrivilege).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste
          modal.close(); // Fermer la modale
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Type Pointage:', error);
          alert('Une erreur est survenue lors de l\'ajout du Type Pointage.');
        }
      );
    } else {
      this.service.update(this.selectedPrivilege.id, this.selectedPrivilege).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste
          modal.close(); // Fermer la modale
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du Type Pointage:', error);
          alert('Une erreur est survenue lors de la mise à jour du Type Pointage.');
        }
      );
    }
  }

  // Supprime un privilège par ID
  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce Type Pointage ?')) {
      this.service.delete(id).subscribe(
        () => {
          this.getAll(); // Rafraîchir la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du Type Pointage:', error);
          alert('Une erreur est survenue lors de la suppression du Type Pointage.');
        }
      );
    }
  }
}