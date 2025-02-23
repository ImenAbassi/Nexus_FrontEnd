// src/app/components/gestion-role/gestion-role.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/models/Role';
import { roleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  role: Role = { name: '', description: '' };
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private roleService: roleService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  // Récupérer les rôles
  getRoles(): void {
    this.roleService.getAll().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }

  // Afficher le modal
  openModal(content: any, action: string, role?: Role): void {
    this.modalTitle = action === 'add' ? 'Ajouter un Rôle' : 'Modifier un Rôle';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    this.role = role ? { ...role } : { name: '', description: '' };

    // Ouvre le modal
    this.modalService.open(content, { ariaLabelledBy: 'roleModalLabel' });
  }

  // Sauvegarder le rôle
  saveRole(modal: any): void {
    if (this.role.id) {
      this.roleService.update(this.role).subscribe(
        () => {
          this.getRoles();
          alert('Rôle mis à jour avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rôle', error);
        }
      );
    } else {
      this.roleService.add(this.role).subscribe(
        () => {
          this.getRoles();
          alert('Rôle ajouté avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du rôle', error);
        }
      );
    }
  }

  // Supprimer un rôle
  deleteRole(id: number | undefined): void {
    if (id) {
      this.roleService.delete(id).subscribe(
        () => {
          this.getRoles();
          alert('Rôle supprimé avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression du rôle', error);
        }
      );
    }
  }

  gotToPrivileges(id: any): void {
    console.log(id)
    this.router.navigate(['/RolePrivilege', id]);
  }
}