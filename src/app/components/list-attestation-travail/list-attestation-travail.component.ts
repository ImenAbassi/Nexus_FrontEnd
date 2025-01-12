import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.setInitialDates();
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
    const selectedType = (event.target as HTMLSelectElement).value;
    this.selectedType = selectedType;

    if (selectedType === 'STANDARD') {
      this.availableDates = this.getMonthlyFridays(new Date(), false);
    } else if (selectedType === 'LEGALISED') {
      this.availableDates = this.getMonthlyFridays(new Date(), true);
    }
  }

  // Obtenir les vendredis du mois
  getMonthlyFridays(date: Date, isBiWeekly: boolean): string[] {
    const fridays: string[] = [];
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = new Date(); // Date système (aujourd'hui)


    // Commencer au premier jour du mois
    date.setDate(1);

    while (date.getMonth() === month) {
      // Vérifier si c'est un vendredi et non le 1er du mois
      if (date.getDay() === 5 && date.getDate() !== 1 && date >= today) {
        fridays.push(this.formatDate(date));
      }
      date.setDate(date.getDate() + 1);
    }

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
}
