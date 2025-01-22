import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttestationTravail } from 'src/app/models/AttestationTravail.model';
import { TypeAttestation } from 'src/app/models/type-attestation.model';
import { AttestationTravailService } from 'src/app/services/attestation-travail.service';
import { TypeAttestationService } from 'src/app/services/type-attestation.service';

@Component({
  selector: 'app-list-attestation-travail',
  templateUrl: './list-attestation-travail.component.html',
  styleUrls: ['./list-attestation-travail.component.css']
})
export class ListAttestationTravailComponent implements OnInit {
  minDate: string = ''; // Date minimale
  maxDate: string = ''; // Date maximale
  availableDates: string[] = []; // Dates valides selon le type
  selectedType: string = ''; // Type d'attestation sélectionné
  attestations: AttestationTravail[] = []; // Liste des attestations
  attestationForm: FormGroup; // Formulaire de création d'attestation
  TypesList:TypeAttestation[]=[];
  constructor(
    private fb: FormBuilder,private typeAttestationService: TypeAttestationService,
    private attestationTravailService: AttestationTravailService
  ) {
    // Initialisation du formulaire
    this.attestationForm = this.fb.group({
      typeAttestation: ['', Validators.required],
      dateSouhaitee: ['', Validators.required],
      motif: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTypes();
    this.setInitialDates();
    this.loadAttestations();
  }
  getAllTypes(): void {
    this.typeAttestationService.getAllTypeAttestations().subscribe(
      (data) => {
        this.TypesList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
  }
  // Définir les dates initiales
  setInitialDates(): void {
    const today = new Date();
    this.minDate = this.formatDate(today);

    // Limite supérieure (1 an)
    const oneYearFromNow = new Date(today.setFullYear(today.getFullYear() + 1));
    this.maxDate = this.formatDate(oneYearFromNow);
  }

  // Déterminer les dates disponibles selon le type d'attestation
  updateAvailableDates(event: Event): void {
    console.log(event);
    const selectedType = (event.target as HTMLSelectElement).value;
    this.selectedType = selectedType;

if (selectedType === 'LEGALISED') {
      this.availableDates = this.getMonthlyFridays(new Date(), true);
    }else {
      this.availableDates = this.getMonthlyFridays(new Date(), false);

    }

    // Mettre à jour le champ dateSouhaitee dans le formulaire
    this.attestationForm.get('dateSouhaitee')?.setValue('');
  }

  // Obtenir les vendredis du mois
  getMonthlyFridays(date: Date, isBiWeekly: boolean): string[] {
    const fridays: string[] = [];
    const today = new Date(); // Date système (aujourd'hui)

    // Fonction pour obtenir les vendredis d'un mois donné
    const getFridaysForMonth = (startDate: Date): string[] => {
      const monthFridays: string[] = [];
      const month = startDate.getMonth();
      const year = startDate.getFullYear();

      // Commencer au premier jour du mois
      startDate.setDate(1);

      while (startDate.getMonth() === month) {
        // Vérifier si c'est un vendredi et non le 1er du mois
        if (startDate.getDay() === 5 && startDate.getDate() !== 1 && startDate >= today) {
          monthFridays.push(this.formatDate(startDate));
        }
        startDate.setDate(startDate.getDate() + 1);
      }

      return monthFridays;
    };

    // Obtenir les vendredis du mois actuel
    const currentMonthFridays = getFridaysForMonth(new Date(date));

    // Obtenir les vendredis du mois prochain
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthFridays = getFridaysForMonth(nextMonthDate);

    // Combiner les deux listes
    fridays.push(...currentMonthFridays, ...nextMonthFridays);

    // Si c'est pour "Légalisée", ne garder qu'un vendredi sur deux
    if (isBiWeekly) {
      return fridays.filter((_, index) => index % 2 === 1);
    }

    return fridays;
  }

  // Formater une date en chaîne (YYYY-MM-DD)
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Charger les attestations depuis le backend
  loadAttestations(): void {
    this.attestationTravailService.obtenirToutesLesAttestations().subscribe(
      (data) => {
        this.attestations = data;console.log(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des attestations', error);
      }
    );
  }
  validerAttestation(id: any): void {
    this.attestationTravailService.mettreAJourEtat(id).subscribe(
      (response) => {
        console.log('Attestation validée avec succès', response);
        this.loadAttestations(); // Recharger la liste des attestations
        alert('Attestation validée avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la validation de l\'attestation', error);
        alert('Erreur lors de la validation de l\'attestation : ' + error.message);
      }
    );
  }
  // Soumettre le formulaire de création d'attestation
  onSubmit(): void {
    if (this.attestationForm.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const attestation: AttestationTravail = {
        typeAttestation: { id: 1, nom: this.attestationForm.value.typeAttestation },
        dateSouhaitee: new Date(this.attestationForm.value.dateSouhaitee),
        motif: this.attestationForm.value.motif,
        dateCreation: new Date(),
        etatDemande: 'EN_ATTENTE',
        utilisateur: user
      };

      this.attestationTravailService.creerAttestation(attestation).subscribe(
        (response) => {
          console.log('Attestation créée avec succès', response);
          this.loadAttestations(); // Recharger la liste des attestations
          this.attestationForm.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          console.error('Erreur lors de la création de l\'attestation', error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }
}