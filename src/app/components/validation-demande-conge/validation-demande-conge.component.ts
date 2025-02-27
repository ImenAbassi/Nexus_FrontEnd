import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemandeConge } from 'src/app/models/DemandeConge.model';
import { TypeConge } from 'src/app/models/type-conge.model';
import { DemandeCongeService } from 'src/app/services/demande-conge.service';
import { PrivilegeService } from 'src/app/services/PrivilegeService.service';
import { TypeCongeService } from 'src/app/services/type-conge.service';

@Component({
  selector: 'app-validation-demande-conge',
  templateUrl: './validation-demande-conge.component.html',
  styleUrls: ['./validation-demande-conge.component.css']
})
export class ValidationDemandeCongeComponent implements OnInit {
  demandes: DemandeConge[] = [];
  nouvelleDemande: DemandeConge = new DemandeConge(); // Objet pour stocker les données du formulaire
  typesConge: TypeConge[] = []; // Liste des types de congé
  selectedDemandeId: number | null = null; // ID de la demande sélectionnée
  ValidationRH: boolean = false;
  ValidationChef: boolean = false;
  ValidationSuperviseur: boolean = false;



  constructor(
    private demandeCongeService: DemandeCongeService,
    private typeCongeService: TypeCongeService,
    private privilegeService: PrivilegeService,
    private modalService: NgbModal // Injecter NgbModal
  ) { }

  ngOnInit(): void {
    this.ValidationRH=this.privilegeService.hasPrivilege(['Validation_Conge_RH']);
    this.ValidationChef=this.privilegeService.hasPrivilege(['Validation_Conge_ChefProjet']);
    this.ValidationSuperviseur=this.privilegeService.hasPrivilege(['Validation_Conge_Superviseur']);
    
    this.loadTypesConge(); // Charger les types de congé
  
    // Récupérer l'utilisateur connecté depuis le localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser; // ID de l'utilisateur connecté
  
      // Vérifier les privilèges et charger les demandes en conséquence
      if (this.privilegeService.hasPrivilege('Validation_Conge_RH')) {
        this.loadDemandes(); // Charger toutes les demandes pour RH
      } else if (this.privilegeService.hasPrivilege('Validation_Conge_ChefProjet')) {
        this.loadDemandesForProjectLeader(userId); // Charger les demandes pour le chef de projet
      } else if (this.privilegeService.hasPrivilege('Validation_Conge_Superviseur')) {
        this.loadDemandesForSupervisor(userId); // Charger les demandes pour le superviseur
      } else {
        console.warn('Aucun privilège de validation de congé trouvé.');
      }
    } else {
      console.error('Aucun utilisateur connecté trouvé dans le localStorage.');
    }
  }

 // Charger toutes les demandes de congé (pour RH)
loadDemandes(): void {
  this.demandeCongeService.getAllConges().subscribe(
    (data) => {
      this.demandes = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des demandes de congé', error);
      alert('Une erreur est survenue lors du chargement des demandes de congé.');
    }
  );
}

// Charger les demandes pour un chef de projet
loadDemandesForProjectLeader(projectLeaderId: number): void {
  this.demandeCongeService.getDemandesForProjectLeader(projectLeaderId).subscribe(
    (data) => {
      this.demandes = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des demandes pour le chef de projet', error);
      alert('Une erreur est survenue lors du chargement des demandes pour le chef de projet.');
    }
  );
}

// Charger les demandes pour un superviseur
loadDemandesForSupervisor(supervisorId: number): void {
  this.demandeCongeService.getDemandesForSupervisor(supervisorId).subscribe(
    (data) => {
      this.demandes = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des demandes pour le superviseur', error);
      alert('Une erreur est survenue lors du chargement des demandes pour le superviseur.');
    }
  );
}

  // Charger la liste des types de congé
  loadTypesConge(): void {
    this.typeCongeService.getAllTypeConges().subscribe(
      (data) => {
        this.typesConge = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des types de congé', error);
        alert('Une erreur est survenue lors du chargement des types de congé.');
      }
    );
  }

  // Créer une nouvelle demande de congé
  creerDemande(): void {
    console.log(this.nouvelleDemande);
    this.demandeCongeService.creerDemande(this.nouvelleDemande).subscribe(
      (response) => {
        console.log('Demande créée avec succès', response);
        this.loadDemandes(); // Recharger la liste après création
        this.nouvelleDemande = new DemandeConge(); // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de la création de la demande', error);
        alert('Une erreur est survenue lors de la création de la demande.');
      }
    );
  }

  // Valider par le superviseur
  validerParSuperviseur(id: number, etat: string): void {
    this.demandeCongeService.validerParSuperviseur(id, etat).subscribe(
      (response) => {
        console.log(response);
        this.loadDemandes(); // Recharger les demandes après validation
      },
      (error) => {
        console.error('Erreur lors de la validation par le superviseur', error);
        alert('Une erreur est survenue lors de la validation par le superviseur.');
      }
    );
  }

  // Valider par le chef de projet
  validerParChefProjet(id: number, etat: string): void {
    this.demandeCongeService.validerParChefProjet(id, etat).subscribe(
      (response) => {
        console.log(response);
        this.loadDemandes(); // Recharger les demandes après validation
      },
      (error) => {
        console.error('Erreur lors de la validation par le chef de projet', error);
        alert('Une erreur est survenue lors de la validation par le chef de projet.');
      }
    );
  }

  validerParRH(id: number, etat: string): void {
    this.demandeCongeService.validerParRH(id, etat).subscribe(
      (response) => {
        console.log(response);
        this.loadDemandes(); // Recharger les demandes après validation
      },
      (error) => {
        console.error('Erreur lors de la validation par le RH', error);
        alert('Une erreur est survenue lors de la validation par le RH.');
      }
    );
  }


  // Supprimer une demande de congé
  deleteConge(id: number): void {
    this.demandeCongeService.deleteConge(id).subscribe(
      () => {
        this.loadDemandes(); // Recharger les demandes après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la demande de congé', error);
        alert('Une erreur est survenue lors de la suppression de la demande de congé.');
      }
    );
  }

  // Ouvrir la modale de validation par le superviseur
  ouvrirValiderSuperviseurModal(content: any, id: number): void {
    this.selectedDemandeId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerSuperviseurModalLabel' });
  }

  // Ouvrir la modale de validation par le chef de projet
  ouvrirValiderChefProjetModal(content: any, id: number): void {
    this.selectedDemandeId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerChefProjetModalLabel' });
  }

  ouvrirValiderRHModal(content: any, id: number): void {
    this.selectedDemandeId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerRHModalLabel' });
  }

  // Ouvrir la modale de suppression
  ouvrirSupprimerModal(content: any, id: number): void {
    this.selectedDemandeId = id;
    this.modalService.open(content, { ariaLabelledBy: 'supprimerModalLabel' });
  }

  // Confirmer la validation par le superviseur
  confirmerValiderSuperviseur(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParSuperviseur(this.selectedDemandeId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }
  refuserValiderSuperviseur(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParSuperviseur(this.selectedDemandeId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }
  // Confirmer la validation par le chef de projet
  confirmerValiderChefProjet(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParChefProjet(this.selectedDemandeId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }

  refuserValiderChefProjet(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParChefProjet(this.selectedDemandeId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }


  confirmerValiderRH(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParRH(this.selectedDemandeId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }

  refuserValiderRH(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParRH(this.selectedDemandeId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }

  // Confirmer la suppression
  confirmerSupprimer(): void {
    if (this.selectedDemandeId !== null) {
      this.deleteConge(this.selectedDemandeId);
      this.modalService.dismissAll();
    }
  }
}