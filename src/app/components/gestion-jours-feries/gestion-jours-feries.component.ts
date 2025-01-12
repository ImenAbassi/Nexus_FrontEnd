import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { JourFerie } from 'src/app/models/jour-ferie.model';
import { JourFerieService } from 'src/app/services/jour-ferie.service';
import { JourSemaineService } from 'src/app/services/jour-semaine.service';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-gestion-jours-feries',
  templateUrl: './gestion-jours-feries.component.html',
  styleUrls: ['./gestion-jours-feries.component.css']
})
export class GestionJoursFeriesComponent implements OnInit {
  listPays: any[] = [];
  listJourSemaine: any[] = [];

  joursFeries: JourFerie = new JourFerie();
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  listJourFeries : any[] =[];

  constructor(
    private jourSemaineService: JourSemaineService,

    private paysService: PaysService,
    private router: Router,
    private jourferieService: JourFerieService
  ) {}

  ngOnInit(): void {
    console.log('Initialisation des données dans GestionJoursFeriesComponent');
    this.initData();
  }
  

  submitjoursFeries(): void {
    console.log('Campagne avant envoi :', this.joursFeries);
    this.loading = true;  // Set loading state to true
    this.jourferieService.createJourFerie(this.joursFeries).subscribe(
      (response) => {
        console.log('Campagne créée avec succès', response);
        this.successMessage = 'La campagne a été créée avec succès!';
        this.errorMessage = '';
        this.loading = false; // Reset loading state
      },
      (error) => {
        console.error('Erreur lors de la création de la campagne', error);
        this.errorMessage = 'Une erreur est survenue lors de la création de la campagne.';
        this.successMessage = '';
        this.loading = false; // Reset loading state
      }
    );
  }

  initData() {
    this.loading = true;
    forkJoin({
      jourSemaine: this.jourSemaineService.getAllJourSemaine(),
      pays: this.paysService.getAllPays(),
      listJourFeries : this.jourferieService.getJoursFeries(),

    }).subscribe({
      next: (responses) => {
        console.log('Réponses:', responses);
        this.listPays = responses.pays;
        this.listJourSemaine = responses.jourSemaine;
        this.listJourFeries=responses.listJourFeries;

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données:', err);
        this.loading = false;
      },
    });
  }
  

  openDeleteModal(joursFeries: any): void {
    // Logic for opening the delete confirmation modal
  }

  confirmDelete(): void {
    // Logic for confirming the deletion of a holiday
  }

  // Action pour visualiser la campagne
  viewjoursFeries(joursFeries: any): void {
    console.log('Vue de la campagne:', joursFeries);
    // You can add logic to view holiday details
  }

  // Action pour éditer la campagne
  editjoursFeries(joursFeries: any): void {
    console.log('Modification de la campagne:', joursFeries);
    // You can open a modal or navigate to an edit page
  }
}
