import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Taxi } from 'src/app/models/Taxi.model';
import { EtatDemande } from 'src/app/models/user.model';
import { TaxiService } from 'src/app/services/taxi.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html',
  styleUrls: ['./taxi.component.css'],
})
export class TaxiComponent implements OnInit {
  listTaxis: Taxi[] = []; // Liste des demandes de taxi
  selectedTaxi: Taxi | null = null; // Taxi sélectionné pour la vue ou l'édition
  isEditing: boolean = false; // Indicateur pour savoir si on est en mode édition
  taxi: Taxi = { // Objet pour le formulaire d'ajout
    id: 0,
    user: null,
    localisationArrivee: '',
    localisationMap:'',
    heureDepart: '',
    etatDemande: EtatDemande.EN_ATTENTE,
  };
  listLocalisation:any[]=[];
  constructor(private taxiService: TaxiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTaxisByUser();

  }

  // Récupérer toutes les demandes de taxi
  loadTaxisByUser(): void {
    // Récupérer l'utilisateur connecté depuis le localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser; // ID de l'utilisateur connecté
      if (user.adressePersonnelle2) {
        this.listLocalisation.push(user.adressePersonnelle2);
      }
      
      if (user.adressePersonnelle3) {
        this.listLocalisation.push(user.adressePersonnelle3);
      }
      // Récupérer les demandes de taxi pour cet utilisateur
      this.taxiService.getTaxisByUser(userId).subscribe({
        next: (data) => (this.listTaxis = data),
        error: (err) => console.error('Erreur lors de la récupération des taxis:', err),
      });
    } else {
      console.error('Aucun utilisateur connecté trouvé dans le localStorage.');
    }
  }

  // Ouvrir le modal d'ajout
  ouvrirAjouterTaxiModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  // Ajouter une demande de taxi
  submitTaxi(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const taxiRequest = {
      localisationArrivee: this.taxi.localisationArrivee,
      heureDepart: this.taxi.heureDepart,
      etatDemande: EtatDemande.EN_ATTENTE,
    };

    this.taxiService.ajouterTaxi(user.idUser, taxiRequest).subscribe({
      next: () => {
        this.loadTaxisByUser(); this.taxi = {
          id: 0,
          user: null,
          localisationArrivee: '',
          localisationMap: '',
          heureDepart: '',
          etatDemande: EtatDemande.EN_ATTENTE,
        }; // Réinitialiser le formulaire
      },
      error: (err) => console.error('Erreur lors de l\'ajout de la demande de taxi:', err),
    });
  }

  // Afficher les détails d'une demande de taxi
  viewTaxi(taxi: Taxi): void {
    this.selectedTaxi = taxi;
    this.modalService.open('viewTaxiModal'); // Ouvrir la modal de détails
  }

  // Fermer la modal de détails
  closeViewModal(): void {
    this.modalService.dismissAll('viewTaxiModal');
    this.selectedTaxi = null;
  }

  // Éditer une demande de taxi
  editTaxi(taxi: Taxi): void {
    this.selectedTaxi = { ...taxi }; // Copier le taxi sélectionné
    this.isEditing = true;
    this.modalService.open('editTaxiModal'); // Ouvrir la modal d'édition
  }

  // Fermer la modal d'édition
  closeEditModal(): void {
    this.modalService.dismissAll('editTaxiModal');
    this.selectedTaxi = null;
    this.isEditing = false;
  }

  // Ouvrir la modal de confirmation de suppression
  openDeleteModal(taxi: Taxi): void {
    this.selectedTaxi = taxi;
    this.modalService.open('deleteTaxiModal');
  }

  // Mettre à jour une demande de taxi
  mettreAJourTaxi(): void {
    if (this.selectedTaxi) {
      this.taxiService.mettreAJourEtatTaxi(this.selectedTaxi.id, this.selectedTaxi.etatDemande).subscribe({
        next: () => {
          this.loadTaxisByUser(); this.selectedTaxi = null; // Réinitialiser la sélection
          this.isEditing = false; // Quitter le mode édition
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la demande de taxi:', err),
      });
    }
  }

  // Confirmer la suppression d'une demande de taxi
  confirmDelete(): void {
    if (this.selectedTaxi) {
      this.taxiService.supprimerTaxi(this.selectedTaxi.id).subscribe({
        next: () => {
          this.loadTaxisByUser(); this.selectedTaxi = null; // Réinitialiser la sélection
        },
        error: (err) => console.error('Erreur lors de la suppression de la demande de taxi:', err),
      });
    }
  }

  // Exporter les données en Excel
  exportToExcel(): void {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const taxisAujourdHui = this.listTaxis.filter((taxi) => {
      const dateCreation = new Date(taxi.dateCreation);
      dateCreation.setHours(0, 0, 0, 0);
      return dateCreation.getTime() === aujourdHui.getTime();
    });

    const data = taxisAujourdHui.map((taxi) => ({
      ID: taxi.id,
      Utilisateur: taxi.user.nom + ' ' + taxi.user.prenom,
      CIN: taxi.user.cin,
      'Localisation Arrivée': taxi.localisationArrivee,
      'Heure Départ': taxi.heureDepart,
      'État Demande': taxi.etatDemande,
      'Date Création': taxi.dateCreation,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Taxis Aujourd\'hui');
    XLSX.writeFile(wb, 'Taxis_Aujourdhui.xlsx');
  }
}