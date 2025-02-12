import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Taxi } from 'src/app/models/Taxi.model';
import { EtatDemande } from 'src/app/models/user.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html',
  styleUrls: ['./taxi.component.css']
})
export class TaxiComponent implements OnInit {
  listTaxis: Taxi[] = []; // Liste des demandes de taxi
  selectedTaxi: Taxi | null = null; // Taxi sélectionné pour la vue ou l'édition
  isEditing: boolean = false; // Indicateur pour savoir si on est en mode édition
  taxi: Taxi = { // Objet pour le formulaire d'ajout
    id: 0,
    user: null,
    localisationArrivee: '',
    heureDepart: '',
    etatDemande: EtatDemande.EN_ATTENTE
  };

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.obtenirTousLesTaxis();
  }

  // Récupérer toutes les demandes de taxi
  obtenirTousLesTaxis(): void {
    this.http.get<Taxi[]>('http://localhost:8081/nexus/taxi/tous').subscribe({
      next: (data) => this.listTaxis = data,
      error: (err) => console.error('Erreur lors de la récupération des taxis:', err)
    });
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
      heureDepart: this.taxi.heureDepart
    };

    this.http.post<Taxi>(`http://localhost:8081/nexus/taxi/demander/${user.idUser}`, taxiRequest).subscribe({
      next: () => {
        this.obtenirTousLesTaxis(); // Rafraîchir la liste
        this.taxi = { 
          id: 0, 
          user: null, 
          localisationArrivee: '', 
          heureDepart: '', 
          etatDemande: EtatDemande.EN_ATTENTE
        }; // Réinitialiser le formulaire
      },
      error: (err) => console.error('Erreur lors de l\'ajout de la demande de taxi:', err)
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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.selectedTaxi.user = user;
      this.http.put<Taxi>(`http://localhost:8081/nexus/taxi/${this.selectedTaxi.id}/etat`, {
        etat: this.selectedTaxi.etatDemande
      }).subscribe({
        next: () => {
          this.obtenirTousLesTaxis(); // Rafraîchir la liste
          this.selectedTaxi = null; // Réinitialiser la sélection
          this.isEditing = false; // Quitter le mode édition
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la demande de taxi:', err)
      });
    }
  }

  // Confirmer la suppression d'une demande de taxi
  confirmDelete(): void {
    if (this.selectedTaxi) {
      this.http.delete(`http://localhost:8081/nexus/taxi/${this.selectedTaxi.id}`).subscribe({
        next: () => {
          this.obtenirTousLesTaxis(); // Rafraîchir la liste
          this.selectedTaxi = null; // Réinitialiser la sélection
        },
        error: (err) => console.error('Erreur lors de la suppression de la demande de taxi:', err)
      });
    }
  }

  // Exporter les données en Excel (à implémenter)


exportToExcel(): void {
    console.log('Export to Excel');

    // Obtenir la date d'aujourd'hui
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    // Filtrer les taxis pour ne garder que ceux créés aujourd'hui
    const taxisAujourdHui = this.listTaxis.filter(taxi => {
        const dateCreation = new Date(taxi.dateCreation);
        dateCreation.setHours(0, 0, 0, 0);
        return dateCreation.getTime() === aujourdHui.getTime();
    });

    // Mapper les données pour remplacer les noms des colonnes
    const data = taxisAujourdHui.map(taxi => ({
        'ID': taxi.id,
        'Utilisateur': taxi.user.nom + ' ' + taxi.user.prenom ,
        'CIN': taxi.user.nom + ' ' + taxi.user.prenom ,
        'Localisation Arrivée': taxi.localisationArrivee,
        'Heure Départ': taxi.heureDepart,
        'État Demande': taxi.etatDemande,
        'Date Création': taxi.dateCreation
    }));

    // Créer une feuille de calcul
    const ws = XLSX.utils.json_to_sheet(data); // Ne pas ajouter automatiquement les en-têtes

    // Définir les en-têtes personnalisés avec des styles
    const headers = [
        { header: 'ID', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Utilisateur', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'CIN', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Localisation Arrivée', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Heure Départ', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'État Demande', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Date Création', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } }
    ];

    // Ajouter les en-têtes à la feuille de calcul
    const headerRange = XLSX.utils.decode_range(ws['!ref'] || 'A1:Z1');
    headers.forEach((header, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: index });
        ws[cellAddress] = { v: header.header, t: 's', s: header.style };
    });

    // Ajuster la largeur des colonnes
    const colWidths = [
        { wch: 10 }, // ID
        { wch: 20 }, // Utilisateur
        { wch: 25 }, // Localisation Arrivée
        { wch: 15 }, // Heure Départ
        { wch: 15 }, // État Demande
        { wch: 20 }  // Date Création
    ];
    ws['!cols'] = colWidths;

    // Créer un nouveau classeur et ajouter la feuille de calcul
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Taxis Aujourd\'hui');

    // Exporter le fichier Excel
    XLSX.writeFile(wb, 'Taxis_Aujourdhui.xlsx');
}
}