import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutorisationSortie } from 'src/app/models/AutorisationSortie.model';
import { AutorisationSortieService } from 'src/app/services/autorisation-sortie.service';

@Component({
  selector: 'app-list-sortie',
  templateUrl: './list-sortie.component.html',
  styleUrls: ['./list-sortie.component.css']
})
export class ListSortieComponent implements OnInit {
  autorisations: AutorisationSortie[] = [];
  nouvelleAutorisation:AutorisationSortie = new AutorisationSortie(); // Objet pour stocker les données du formulaire
  selectedAutorisationId: number | null = null; // ID de l'autorisation sélectionnée

  constructor(
    private autorisationSortieService: AutorisationSortieService,
    private modalService: NgbModal // Injecter NgbModal
  ) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser; 
    this.loadAutorisationsByUser(userId);
    }
  }

  loadAutorisationsByUser(userId: number): void {
    this.autorisationSortieService.getAutorisationsByUser(userId).subscribe(
      (data) => {
        this.autorisations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des autorisations de sortie', error);
        alert('Une erreur est survenue lors du chargement des autorisations de sortie.');
      }
    );
  }

  // Charger la liste des autorisations de sortie
  loadAutorisations(): void {
    this.autorisationSortieService.getAllAutorisations().subscribe(
      (data) => {
        this.autorisations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des autorisations de sortie', error);
        alert('Une erreur est survenue lors du chargement des autorisations de sortie.');
      }
    );
  }

  // Créer une nouvelle autorisation de sortie
  creerDemande(): void {
    this.autorisationSortieService.creerDemande(this.nouvelleAutorisation).subscribe(
      (response) => {
        console.log('Autorisation créée avec succès', response);
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          const userId = user.idUser; 
        this.loadAutorisationsByUser(userId);
        }
        this.nouvelleAutorisation = new AutorisationSortie(); // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de la création de l\'autorisation', error);
        alert('Une erreur est survenue lors de la création de l\'autorisation.');
      }
    );
  }
  // Valider par le superviseur
  validerParSuperviseur(id: number, etat: string): void {
    this.autorisationSortieService.validerParSuperviseur(id, etat).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la validation par le superviseur', error);
        alert('Une erreur est survenue lors de la validation par le superviseur.');
      }
    );
  }

  // Valider par le chef de projet
  validerParChefProjet(id: number, etat: string): void {
    this.autorisationSortieService.validerParChefProjet(id, etat).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
            },
      (error) => {
        console.error('Erreur lors de la validation par le chef de projet', error);
        alert('Une erreur est survenue lors de la validation par le chef de projet.');
      }
    );
  }

  validerParRH(id: number, etat: string): void {
    this.autorisationSortieService.validerParRH(id, etat).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
            },
      (error) => {
        console.error('Erreur lors de la validation par le RH', error);
        alert('Une erreur est survenue lors de la validation par le RH.');
      }
    );
  }


  // Supprimer une autorisation de sortie
  deleteAutorisation(id: number): void {
    this.autorisationSortieService.deleteAutorisation(id).subscribe(
      () => {
        const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser; 
    this.loadAutorisationsByUser(userId);
    }
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'autorisation de sortie', error);
        alert('Une erreur est survenue lors de la suppression de l\'autorisation de sortie.');
      }
    );
  }

   // Ouvrir la modale de validation par le superviseur
   ouvrirValiderSuperviseurModal(content: any, id: number): void {
    this.selectedAutorisationId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerSuperviseurModalLabel' });
  }

  // Ouvrir la modale de validation par le chef de projet
  ouvrirValiderChefProjetModal(content: any, id: number): void {
    this.selectedAutorisationId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerChefProjetModalLabel' });
  }

  ouvrirValiderRHModal(content: any, id: number): void {
    this.selectedAutorisationId = id;
    this.modalService.open(content, { ariaLabelledBy: 'validerRHModalLabel' });
  }

  // Ouvrir la modale de suppression
  ouvrirSupprimerModal(content: any, id: number): void {
    this.selectedAutorisationId = id;
    this.modalService.open(content, { ariaLabelledBy: 'supprimerModalLabel' });
  }

  // Confirmer la validation par le superviseur
  confirmerValiderSuperviseur(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParSuperviseur(this.selectedAutorisationId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }
  refuserValiderSuperviseur(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParSuperviseur(this.selectedAutorisationId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }
  // Confirmer la validation par le chef de projet
  confirmerValiderChefProjet(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParChefProjet(this.selectedAutorisationId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }

  refuserValiderChefProjet(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParChefProjet(this.selectedAutorisationId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }


  confirmerValiderRH(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParRH(this.selectedAutorisationId, 'APPROUVEE');
      this.modalService.dismissAll();
    }
  }

  refuserValiderRH(): void {
    if (this.selectedAutorisationId !== null) {
      this.validerParRH(this.selectedAutorisationId, 'REJETEE');
      this.modalService.dismissAll();
    }
  }

  // Confirmer la suppression
  confirmerSupprimer(): void {
    if (this.selectedAutorisationId !== null) {
      this.deleteAutorisation(this.selectedAutorisationId);
      this.modalService.dismissAll();
    }
  }
}