import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importer NgbModal
import { DemandeConge } from 'src/app/models/DemandeConge.model';
import { TypeConge } from 'src/app/models/type-conge.model';
import { DemandeCongeService } from 'src/app/services/demande-conge.service';
import { TypeCongeService } from 'src/app/services/type-conge.service';

@Component({
  selector: 'app-list-conge',
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.css']
})
export class ListCongeComponent implements OnInit {
  demandes: DemandeConge[] = [];
  nouvelleDemande: DemandeConge = new DemandeConge(); // Objet pour stocker les données du formulaire
  typesConge: TypeConge[] = []; // Liste des types de congé
  selectedDemandeId: number | null = null; // ID de la demande sélectionnée

  constructor(
    private demandeCongeService: DemandeCongeService,
    private typeCongeService: TypeCongeService,
    private modalService: NgbModal // Injecter NgbModal
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
    this.loadTypesConge(); // Charger les types de congé
  }

  // Charger la liste des demandes de congé
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

  // Ouvrir la modale de suppression
  ouvrirSupprimerModal(content: any, id: number): void {
    this.selectedDemandeId = id;
    this.modalService.open(content, { ariaLabelledBy: 'supprimerModalLabel' });
  }

  // Confirmer la validation par le superviseur
  confirmerValiderSuperviseur(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParSuperviseur(this.selectedDemandeId, 'ACCEPTEE');
      this.modalService.dismissAll();
    }
  }

  // Confirmer la validation par le chef de projet
  confirmerValiderChefProjet(): void {
    if (this.selectedDemandeId !== null) {
      this.validerParChefProjet(this.selectedDemandeId, 'ACCEPTEE');
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