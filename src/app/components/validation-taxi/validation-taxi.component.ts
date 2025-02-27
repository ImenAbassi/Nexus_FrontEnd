import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Taxi } from 'src/app/models/Taxi.model';
import { EtatDemande } from 'src/app/models/user.model';
import { TaxiService } from 'src/app/services/taxi.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-validation-taxi',
  templateUrl: './validation-taxi.component.html',
  styleUrls: ['./validation-taxi.component.css']
})
export class ValidationTaxiComponent implements OnInit {
  listTaxisFiltered: any[] = [];
  selectedDate: Date = new Date(); // Initialiser avec la date actuelle
  listTaxis: Taxi[] = []; // Liste des demandes de taxi
  selectedTaxi: Taxi | null = null; // Taxi sélectionné pour la vue ou l'édition
  selectedTaxiId: any;
  isEditing: boolean = false; // Indicateur pour savoir si on est en mode édition
  taxi: Taxi = { // Objet pour le formulaire d'ajout
    id: 0,
    user: null,
    localisationArrivee: '',
    heureDepart: '',
    etatDemande: EtatDemande.EN_ATTENTE,
  };

  constructor(private taxiService: TaxiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.obtenirTousLesTaxis();
    this.filterByDate(); // Appliquer le filtre par défaut dès le chargement
  }

  // Récupérer toutes les demandes de taxi
  obtenirTousLesTaxis(): void {
    this.taxiService.obtenirTousLesTaxis().subscribe({
      next: (data) => {
        this.listTaxis = data;
        this.filterByDate(); // Filtrer après avoir récupéré les données
      },
      error: (err) => console.error('Erreur lors de la récupération des taxis:', err),
    });
  }

  // Filtrer les demandes par date
  filterByDate(): void {
    if (!this.selectedDate) {
      this.listTaxisFiltered = [...this.listTaxis];
    } else {
      const selectedDateObj = new Date(this.selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour une comparaison précise
      this.listTaxisFiltered = this.listTaxis.filter((taxi) => {
        const taxiDate = new Date(taxi.dateCreation);
        taxiDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour une comparaison précise
        return taxiDate.getTime() === selectedDateObj.getTime();
      });
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
        this.obtenirTousLesTaxis(); // Rafraîchir la liste
        this.taxi = {
          id: 0,
          user: null,
          localisationArrivee: '',
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
          this.obtenirTousLesTaxis(); // Rafraîchir la liste
          this.selectedTaxi = null; // Réinitialiser la sélection
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
          this.obtenirTousLesTaxis(); // Rafraîchir la liste
          this.selectedTaxi = null; // Réinitialiser la sélection
        },
        error: (err) => console.error('Erreur lors de la suppression de la demande de taxi:', err),
      });
    }
  }

  // Exporter les données en Excel
  exportToExcel(): void {
    const data = this.listTaxisFiltered.map((taxi) => ({
      "Utilisateur": `${taxi.user?.nom} ${taxi.user?.prenom}`,
      'Localisation': taxi?.localisationArrivee,
      'Heure Départ': taxi?.heureDepart,
      'État Demande': taxi?.etatDemande,
      'Date Création': taxi?.dateCreation,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Taxis Aujourd\'hui');
    XLSX.writeFile(wb, `Taxis_${this.selectedDate}.xlsx`);
  }

  // Ouvrir la modal de validation RH
  ouvrirValiderRHModal(modal: any, taxiId: number): void {
    this.selectedTaxiId = taxiId; // Stocker l'ID de la demande sélectionnée
    this.modalService.open(modal, { centered: true }); // Ouvrir la modale
  }

  // Valider la demande par les RH
  confirmerValiderRH(): void {
    if (this.selectedTaxiId !== null) {
      this.taxiService.validateDemande(this.selectedTaxiId, EtatDemande.APPROUVEE).subscribe({
        next: () => {
          window.location.reload();
          this.modalService.dismissAll(); // Fermer la modale
        },
        error: (err) => console.error('Erreur lors de la validation par les RH:', err),
      });
    }
  }

  // Refuser la demande par les RH
  refuserValiderRH(): void {
    if (this.selectedTaxiId !== null) {
      this.taxiService.validateDemande(this.selectedTaxiId, EtatDemande.REJETEE).subscribe({
        next: () => {
          window.location.reload();
          this.modalService.dismissAll(); // Fermer la modale
        },
        error: (err) => console.error('Erreur lors du refus par les RH:', err),
      });
    }
  }
}