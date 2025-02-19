import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {
  // Déclaration des KPI
  totalHeuresTravailleesParUtilisateur: number = 0;
  productiviteUserPercentage: number = 0;

  countPointagesParJour: number = 0;
  pointageJourPercentage: number = 0;

  tauxUtilisationOperation: number = 0;
  utilisationOperationPercentage: number = 0;

  tempsMoyenParOperation: number = 0;
  tempsMoyenPercentage: number = 0;

  productiviteGlobale: number = 0;
  productiviteGlobalePercentage: number = 0;

  repartitionHeuresParUtilisateur: string = '';
  repartitionHeuresPercentage: number = 0;

  operationsFrequentes: string = '';
  operationsFrequentesPercentage: number = 0;

  tauxProductiviteParJour: number = 0;
  productiviteJourPercentage: number = 0;

  nbOperationsParUtilisateur: string = '';
  nbOperationsPercentage: number = 0;

  topProductifs: string = '';
  topProductifsPercentage: number = 0;

  tauxAchevement: number = 0;
  achevementPercentage: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Logique pour calculer les KPI
    this.totalHeuresTravailleesParUtilisateur = this.calculerTotalHeuresTravaillees();
    this.productiviteUserPercentage = 55; // Exemple
    this.countPointagesParJour = this.calculerNombrePointagesParJour();
    this.pointageJourPercentage = 124; // Exemple

    // Ajoutez ici les autres calculs...
  }

  // Méthodes pour calculer les KPI
  private calculerTotalHeuresTravaillees(): number {
    // Implémentez la logique pour calculer les heures travaillées par utilisateur
    return 1600; // Valeur d'exemple
  }

  private calculerNombrePointagesParJour(): number {
    // Implémentez la logique pour compter les pointages par jour
    return 357; // Valeur d'exemple
  }
}
