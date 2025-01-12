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
@Component({
  selector: 'app-list-campagnes',
  templateUrl: './list-campagnes.component.html',
  styleUrls: ['./list-campagnes.component.css']
})
export class ListCampagnesComponent implements OnInit {
  /*campagne: Compagne = new Compagne(); */ // Assurez-vous que la campagne est initialisée avec les bons champs
  ////plannig fonctinnel///
  planning = {
    horaireDebut: '',
    horaireFin: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  ////plannig fonctinnel///
  listCibles: any[] = [];
  listPays: any[] = [];
  listLangues: any[] = [];
  listTypologies: any[] = [];
  listTypologieCanal: any[] = [];
  // L'objet campagne qui sera envoyé au backend
  campagne: Compagne = new Compagne();
  availablePlannings: Planning[] = [];
  selectedPlanningId: number | null = null;
  // Récupérer dynamiquement les valeurs des énumérations
  listCampagnes : any[] =[];

  constructor(
    private cibleService: CibleService,
    private typologieCanalService: TypologieCanalService,
    private typologieService: TypologieService,
    private langueService: LangueService,
    private paysService: PaysService,
    private planningService: PlanningService,

    private router: Router,
    private compagneService: CompagneService) { }


  ngOnInit(): void {
    // Chargez les plannings existants à partir du backend ou d'une source de données.
    
    this.initData();
  }
  ////plannig fonctinnel///

  onSubmit() {
    this.planningService.createPlanning(this.planning).subscribe({
      next: (response) => {
        this.successMessage = 'Planning ajouté avec succès.';
        this.errorMessage = '';
        this.planning = { horaireDebut: '', horaireFin: '' }; // Réinitialiser le formulaire
        // Rediriger vers /listcompagne après succès
        /* this.router.navigate(['/list-campagnes']);*/
        window.location.reload();


      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout du planning.';
        this.successMessage = '';
      },
    });
  }
  ////plannig fonctinnel///


  // Lorsque l'utilisateur change de planning, on met à jour les attributs dans le formulaire
  onPlanningChange(): void {
    if (this.selectedPlanningId !== null) {
      const selectedPlanning = this.availablePlannings.find(p => p.id === this.selectedPlanningId);
      if (selectedPlanning) {
        // Afficher les informations du planning sélectionné (horaireDebut, horaireFin, etc.)
        this.campagne.plannings.push({
          id: selectedPlanning.id,
          horaireDebut: selectedPlanning.horaireDebut,
          horaireFin: selectedPlanning.horaireFin
        });
      }
    }
  }

  addPlanning(): void {
    // Ajoute un planning vide si l'utilisateur souhaite en créer un nouveau
    const newPlanning: Planning = {
      horaireDebut: '00:00',
      horaireFin: '00:00'
    };
    this.campagne.plannings.push(newPlanning);
  }
  
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

    
  // Méthode pour gérer l'upload du fichier
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convertir le fichier en base64
        this.campagne.logo = reader.result as string; // base64
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  }


  initData() {
    // Utilisation de forkJoin pour exécuter plusieurs services en parallèle
    forkJoin({
      cible: this.cibleService.getAllCibles(),
      typologieCanal: this.typologieCanalService.getAllTypologieCanaux(),
      typologie: this.typologieService.getAllTypologies(),
      langue: this.langueService.getAllLangues(),
      pays: this.paysService.getAllPays(),
      plannings:this.planningService.getAllPlannings(),
      listCampagnes:this.compagneService.getAllCompagnes()
    }).subscribe({
      next: (responses) => {
        this.listCibles = responses.cible;
        this.listLangues = responses.langue;
        this.listPays = responses.pays;
        this.listTypologieCanal = responses.typologieCanal;
        this.listTypologies = responses.typologie;
        this.availablePlannings = responses.plannings;
        this.listCampagnes=responses.listCampagnes;
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  openDeleteModal(campagne: any): void {
  }
  
  confirmDelete(): void {
  }

  // Action pour visualiser la campagne
  viewCampagne(campagne: any): void {
    console.log('Vue de la campagne:', campagne);
    // Vous pouvez ajouter un service ou une navigation pour afficher les détails
  }

  // Action pour éditer la campagne
  editCampagne(campagne: any): void {
    console.log('Modification de la campagne:', campagne);
    // Ajoutez ici le code pour ouvrir un formulaire de modification
  }
}