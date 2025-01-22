import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Fonction } from 'src/app/models/fonction.model';
import { UserService } from 'src/app/services/user.service';
import { CompagneService } from 'src/app/services/compagne.service';
import { FonctionService } from 'src/app/services/fonction.service';
import { Compagne } from 'src/app/models/Compagne.model';
import { Role } from 'src/app/models/Role';
import { roleService } from 'src/app/services/role.service';
import { userCompagneService } from 'src/app/services/userCompagne.service';
import { UserCompagne } from 'src/app/models/UserCompagne.modal';
import { User } from 'src/app/models/user.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-gestion-user-compagne',
  templateUrl: './gestion-user-compagne.component.html',
  styleUrls: ['./gestion-user-compagne.component.css'],
})
export class GestionUserCompagneComponent implements OnInit {
  userCompagnes: UserCompagne[] = [];
  userCompagne: UserCompagne = {
    user: {} as User,
    compagne: {} as Compagne,
    fonction: {} as Fonction,
    role: {} as Role,
    commentaire: '',
    dateHeureFormation: null,
    dateAffectation: null,
    dateFinAffectation: null,
    supervisor: {} as User,
    projectLeader: {} as User,
  };
  users: User[] = [];
  campagnes: Compagne[] = [];
  fonctions: Fonction[] = [];
  roles: Role[] = [];
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private userCompagneService: userCompagneService,
    private userService: UserService,
    private compagneService: CompagneService,
    private fonctionService: FonctionService,
    private roleService: roleService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserCompagnes();

    // Récupérer les données en parallèle avec forkJoin
    forkJoin({
      users: this.userService.getAllUsers(),
      campagnes: this.compagneService.getAllCompagnes(),
      fonctions: this.fonctionService.getAllFonctions(),
      roles: this.roleService.getAll(),
    }).subscribe(
      (results) => {
        this.users = results.users;
        this.campagnes = results.campagnes;
        this.fonctions = results.fonctions;
        this.roles = results.roles;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  // Récupérer toutes les associations UserCompagne
  getUserCompagnes(): void {
    this.userCompagneService.getAll().subscribe(
      (data) => {
        this.userCompagnes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des associations', error);
      }
    );
  }

  // Afficher le modal
  openModal(content: any, action: string, userCompagne: UserCompagne): void {
    this.modalTitle = action === 'add' ? 'Ajouter une Association' : 'Modifier une Association';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    console.log(userCompagne);

    // Initialisation de l'objet userCompagne
    if(action === 'add' ){
      this.userCompagne = {
        user: {} as User,
        compagne: {} as Compagne,
        fonction: {} as Fonction,
        role: {} as Role,
        commentaire: '',
        dateHeureFormation: null,
        dateAffectation: null,
        dateFinAffectation: null,
        supervisor: {} as User,
        projectLeader: {} as User,
      };
    }else {
      this.userCompagne = userCompagne;
      console.log( this.userCompagne);
    }

    // Ouvre le modal
    this.modalService.open(content, { ariaLabelledBy: 'userCompagneModalLabel', size: 'lg' });
  }

  // Sauvegarder l'association UserCompagne
  saveUserCompagne(modal: any): void {
    if (this.userCompagne.id) {
      this.userCompagneService.update(this.userCompagne).subscribe(
        () => {
          this.getUserCompagnes();
          alert('Association mise à jour avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'association', error);
        }
      );
    } else {
      this.userCompagneService.add(this.userCompagne).subscribe(
        () => {
          this.getUserCompagnes();
          alert('Association ajoutée avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'association', error);
        }
      );
    }
  }

  // Supprimer une association UserCompagne
  deleteUserCompagne(id: number | undefined): void {
    if (id) {
      this.userCompagneService.delete(id).subscribe(
        () => {
          this.getUserCompagnes();
          alert('Association supprimée avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'association', error);
        }
      );
    }
  }

  // Dans votre composant TypeScript
compareUsers(user1: User, user2: User): boolean {
  return user1 && user2 ? user1.idUser === user2.idUser : user1 === user2;
}

compareCampagnes(campagne1: Compagne, campagne2: Compagne): boolean {
  return campagne1 && campagne2 ? campagne1.id === campagne2.id : campagne1 === campagne2;
}

compareFonctions(fonction1: Fonction, fonction2: Fonction): boolean {
  return fonction1 && fonction2 ? fonction1.id === fonction2.id : fonction1 === fonction2;
}

compareRoles(role1: Role, role2: Role): boolean {
  return role1 && role2 ? role1.id === role2.id : role1 === role2;
}

exportToExcel(): void {
  // Préparer les données pour l'exportation
  const data = this.userCompagnes.map((uc) => ({
    Utilisateur: `${uc.user?.nom} ${uc.user?.prenom}`,
    Campagne: uc.compagne?.nom,
    Fonction: uc.fonction?.nom,
    Rôle: uc.role?.name,
    Commentaire: uc.commentaire,
    'Date Formation': uc.dateHeureFormation,
    'Date Affectation': uc.dateAffectation,
    'Date Fin Affectation': uc.dateFinAffectation,
    Superviseur: `${uc.supervisor?.nom} ${uc.supervisor?.prenom}`,
    'Chef de Projet': `${uc.projectLeader?.nom} ${uc.projectLeader?.prenom}`,
  }));

  // Créer une feuille de calcul
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Créer un classeur
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Associations');

  // Exporter le fichier Excel
  XLSX.writeFile(workbook, 'associations_user_compagne.xlsx');
}


}