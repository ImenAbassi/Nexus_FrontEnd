import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Compagne } from 'src/app/models/Compagne.model';
import { Planning } from 'src/app/models/user.model';
import { CibleService } from 'src/app/services/cible.service';
import { CompagneService } from 'src/app/services/compagne.service';
import { LangueService } from 'src/app/services/langue.service';
import { PaysService } from 'src/app/services/pays.service';
import { PlanningService } from 'src/app/services/planning.service';
import { TypologieCanalService } from 'src/app/services/typologie-canal.service';
import { TypologieService } from 'src/app/services/typologie.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-campagnes',
  templateUrl: './list-campagnes.component.html',
  styleUrls: ['./list-campagnes.component.css']
})
export class ListCampagnesComponent implements OnInit {
  planning = {
    horaireDebut: '',
    horaireFin: '',
  };
  successMessage: string = '';
  errorMessage: string = '';

  listCibles: any[] = [];
  listPays: any[] = [];
  listLangues: any[] = [];
  listTypologies: any[] = [];
  listTypologieCanal: any[] = [];
  campagne: Compagne = new Compagne();
  availablePlannings: Planning[] = [];
  selectedPlanningId: number | null = null;
  listCampagnes: any[] = [];
  selectedCampagne: any = null;

  constructor(
    private cibleService: CibleService,
    private typologieCanalService: TypologieCanalService,
    private typologieService: TypologieService,
    private langueService: LangueService,
    private paysService: PaysService,
    private planningService: PlanningService,
    private router: Router,
    private compagneService: CompagneService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  // Soumettre un nouveau planning
  onSubmit() {
    this.planningService.createPlanning(this.planning).subscribe({
      next: (response) => {
        this.successMessage = 'Planning ajouté avec succès.';
        this.errorMessage = '';
        this.planning = { horaireDebut: '', horaireFin: '' }; // Réinitialiser le formulaire
        window.location.reload();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout du planning.';
        this.successMessage = '';
      },
    });
  }

  // Changer de planning
  onPlanningChange(): void {
    if (this.selectedPlanningId !== null) {
      const selectedPlanning = this.availablePlannings.find(p => p.id === this.selectedPlanningId);
      if (selectedPlanning) {
        this.campagne.plannings.push({
          id: selectedPlanning.id,
          horaireDebut: selectedPlanning.horaireDebut,
          horaireFin: selectedPlanning.horaireFin
        });
      }
    }
  }

  // Ajouter un planning
  addPlanning(): void {
    const newPlanning: Planning = {
      horaireDebut: '00:00',
      horaireFin: '00:00'
    };
    this.campagne.plannings.push(newPlanning);
  }

  // Soumettre une campagne
  submitCompagne(): void {
    console.log('Campagne avant envoi :', this.campagne);
    this.compagneService.createCompagne(this.campagne).subscribe(
      (response) => {
        console.log('Campagne créée avec succès', response);
        this.successMessage = 'La campagne a été créée avec succès!';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Erreur lors de la création de la campagne', error);
        this.errorMessage = 'Une erreur est survenue lors de la création de la campagne.';
        this.successMessage = '';
      }
    );
  }

  // Gérer l'upload du fichier
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.campagne.logo = reader.result as string; // base64
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  }

  // Initialiser les données
  initData() {
    forkJoin({
      cible: this.cibleService.getAllCibles(),
      typologieCanal: this.typologieCanalService.getAllTypologieCanaux(),
      typologie: this.typologieService.getAllTypologies(),
      langue: this.langueService.getAllLangues(),
      pays: this.paysService.getAllPays(),
      plannings: this.planningService.getAllPlannings(),
      listCampagnes: this.compagneService.getAllCompagnes()
    }).subscribe({
      next: (responses) => {
        this.listCibles = responses.cible;
        this.listLangues = responses.langue;
        this.listPays = responses.pays;
        this.listTypologieCanal = responses.typologieCanal;
        this.listTypologies = responses.typologie;
        this.availablePlannings = responses.plannings;
        this.listCampagnes = responses.listCampagnes;
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  // Exporter vers Excel
  exportToExcel(): void {
    try {
      const data = this.listCampagnes.map(campagne => ({
        Nom: campagne.nom,
        Client: campagne.client,
        Cible: campagne.cible?.type || '',
        Pays: campagne.pays?.nom || '',
        Langue: campagne.langue?.nom || '',
        Typologie: campagne.typologie?.nom || '',
        SalaireBase: campagne.salaireBase || '',
        DeuxiemeSalaire: campagne.salaire2 || '',
        TroisiemeSalaire: campagne.salaire3 || '',
        TypologieCanal: campagne.typologieCanal?.nom || '',
        Plannings: campagne.plannings
          ? campagne.plannings.map((p: Planning) => `${p.horaireDebut} - ${p.horaireFin}`).join(', ')
          : ''
      }));

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Campagnes');
      XLSX.writeFile(workbook, 'campagnes.xlsx');
    } catch (error) {
      console.error('Erreur lors de l\'export vers Excel:', error);
    }
  }

  // Ouvrir le modal de suppression
  openDeleteModal(campagne: any): void {
    this.selectedCampagne = campagne;
    const modal = document.getElementById('modal-notification');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Confirmer la suppression
  confirmDelete(): void {
    if (this.selectedCampagne) {
      this.compagneService.deleteCompagne(this.selectedCampagne.id).subscribe({
        next: () => {
          console.log('Campagne supprimée avec succès');
          const modal = document.getElementById('modal-notification');
          if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
          }
          this.initData(); // Recharger la liste des campagnes
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la campagne', err);
        }
      });
    }
  }

  // Visualiser une campagne
  viewCampagne(campagne: any): void {
    this.selectedCampagne = campagne;
    const modal = document.getElementById('viewCampagneModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Fermer le modal de visualisation
  closeViewModal(): void {
    const modal = document.getElementById('viewCampagneModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  // Modifier une campagne
  editCampagne(campagne: any): void {
    this.selectedCampagne = { ...campagne }; // Copier la campagne sélectionnée
    const modal = document.getElementById('editCampagneModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Fermer le modal d'édition
  closeEditModal(): void {
    const modal = document.getElementById('editCampagneModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  // Mettre à jour une campagne
  updateCampagne(): void {
    this.compagneService.updateCompagne(this.selectedCampagne.id,this.selectedCampagne).subscribe({
      next: (response) => {
        console.log('Campagne mise à jour avec succès', response);
        this.closeEditModal();
        this.initData(); // Recharger la liste des campagnes
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la campagne', error);
      }
    });
  }
}