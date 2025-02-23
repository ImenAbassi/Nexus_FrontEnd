import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivilegeService } from 'src/app/services/PrivilegeService.service';
import { roleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-privilege-management',
  templateUrl: './role-privilege-management.component.html',
  styleUrls: ['./role-privilege-management.component.css']
})
export class RolePrivilegeManagementComponent implements OnInit {

  roleId: any;
  role: any = null;
  privileges: any[] = []; // Tous les privilèges disponibles
  availablePrivileges: any[] = []; // Privilèges non possédés par le rôle
  page: number = 1; // Page actuelle
  pageSize: number = 5; // Nombre d'éléments par page
  searchText: string = ''; // Texte de recherche
  filteredPrivileges: any[] = []; // Privilèges filtrés
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private roleService: roleService,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id');
    if (this.roleId) {
      this.loadRole();
      this.loadAllPrivileges();
    } else {
      console.error('ID du rôle non trouvé dans l\'URL');
    }
  }

  // Charger les détails du rôle et ses privilèges
  loadRole(): void {
    this.roleService.getById(this.roleId).subscribe(
      (role) => {
        this.role = role;
        if (!this.role.privileges) {
          this.role.privileges = []; // Initialiser à un tableau vide si non défini
        }
        this.updateAvailablePrivileges();
      },
      (error) => {
        console.error('Erreur lors du chargement du rôle:', error);
      }
    );
  }

  // Charger tous les privilèges disponibles
  loadAllPrivileges(): void {
    this.privilegeService.getAllPrivileges().subscribe(
      (privileges) => {
        this.privileges = privileges;
        this.filteredPrivileges = [...this.privileges]; // Initialiser les privilèges filtrés
        this.updateAvailablePrivileges();
      },
      (error) => {
        console.error('Erreur lors du chargement des privilèges:', error);
      }
    );
  }

  // Mettre à jour la liste des privilèges disponibles
  updateAvailablePrivileges(): void {
    if (this.role && this.privileges) {
      this.availablePrivileges = this.privileges.filter(
        privilege => !this.role.privileges?.some((p: any) => p.id === privilege.id)
      );
      this.filteredPrivileges = [...this.availablePrivileges]; // Mettre à jour les privilèges filtrés
    } else {
      this.availablePrivileges = []; // Initialiser à un tableau vide si les données ne sont pas disponibles
      this.filteredPrivileges = [];
    }
  }

  // Ajouter un privilège au rôle
  addPrivilegeToRole(privilege: any): void {
    this.roleService.addPrivilegeToRole(this.roleId, privilege.id).subscribe(
      () => {
        if (!this.role.privileges) {
          this.role.privileges = []; // Initialiser à un tableau vide si non défini
        }
        this.role.privileges.push(privilege); // Mettre à jour localement
        this.updateAvailablePrivileges();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du privilège:', error);
      }
    );
  }

  // Supprimer un privilège du rôle
  removePrivilegeFromRole(privilege: any): void {
    this.roleService.removePrivilegeFromRole(this.roleId, privilege.id).subscribe(
      () => {
        this.role.privileges = this.role.privileges.filter((p: any) => p.id !== privilege.id); // Mettre à jour localement
        this.updateAvailablePrivileges();
      },
      (error) => {
        console.error('Erreur lors de la suppression du privilège:', error);
      }
    );
  }

  // Ouvrir la modal pour ajouter un privilège
  openAddPrivilegeModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (selectedPrivilege) => {
        this.addPrivilegeToRole(selectedPrivilege);
      },
      () => {
        // Fermeture de la modal (annulation)
        console.log('Modal fermée sans sélection');
      }
    );
  }

  onSearchChange(): void {
    if (this.searchText) {
      this.filteredPrivileges = this.availablePrivileges.filter(privilege =>
        privilege.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredPrivileges = [...this.availablePrivileges]; // Réinitialiser si le champ de recherche est vide
    }
    this.page = 1; // Revenir à la première page après la recherche
  }
}