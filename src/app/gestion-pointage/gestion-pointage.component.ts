import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Pointage } from '../models/Pointage.model';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestion-pointage',
  templateUrl: './gestion-pointage.component.html',
  styleUrls: ['./gestion-pointage.component.css']
})
export class GestionPointageComponent {
  @ViewChild('importModal') importModal!: TemplateRef<any>; // Référence au template du modal

  pointages: Pointage[] = [];
  groupedPointages: { [key: string]: Pointage[] } = {}; // Données groupées par date
  selectedDate: string = new Date().toISOString().split('T')[0]; // Date du jour par défaut
  selectedFile: File | null = null;
  message: string = '';

  constructor(private http: HttpClient,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadPointages();
  }

  openImportModal(): void {
    const modalRef = this.modalService.open(this.importModal, {
      centered: true, // Centrer le modal
      size: 'lg', // Taille du modal (lg = large, sm = petit)
    });
  }

  // Charger tous les pointages
  loadPointages(): void {
    this.http.get<Pointage[]>('http://localhost:8081/nexus/pointages').subscribe(
      (data) => {
        this.pointages = data;
        this.groupPointagesByDate(); // Grouper les données par date
      },
      (error) => {
        console.error('Erreur lors du chargement des pointages :', error);
      }
    );
  }

  // Grouper les pointages par date
  groupPointagesByDate(): void {
    this.groupedPointages = this.pointages.reduce((acc, pointage) => {
      const date = new Date(pointage.datePointage).toISOString().split('T')[0]; // Formater la date
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(pointage);
      return acc;
    }, {} as { [key: string]: Pointage[] });
  }

  // Exporter les données vers Excel
  exportToExcel(): void {
    console.log('Export to Excel');

    // Convertir la date sélectionnée en objet Date
    const selectedDateObj = new Date(this.selectedDate);
    selectedDateObj.setHours(0, 0, 0, 0);

    // Filtrer les pointages pour ne garder que ceux de la date sélectionnée
    const pointagesFiltres = this.pointages.filter(pointage => {
        const datePointage = new Date(pointage.datePointage);
        datePointage.setHours(0, 0, 0, 0);
        return datePointage.getTime() === selectedDateObj.getTime();
    });

    // Mapper les données pour formater les colonnes
    const data = pointagesFiltres.map(pointage => ({
        'ID': pointage.id,
        'Utilisateur': pointage.user.nom + ' ' + pointage.user.prenom,
        'CIN': pointage.user.cin,
        'Heures Travaillées': pointage.heuresTravaillees + ' minutes',
        'Date Pointage': new Date(pointage.datePointage).toLocaleDateString() // Formater la date
    }));

    // Créer une feuille de calcul
    const ws = XLSX.utils.json_to_sheet(data);

    // Définir les en-têtes personnalisés avec des styles
    const headers = [
        { header: 'ID', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Utilisateur', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'CIN', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Heures Travaillées', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Date Pointage', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } }
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
        { wch: 25 }, // Utilisateur
        { wch: 20 }, // Heures Travaillées
        { wch: 20 }  // Date Pointage
    ];
    ws['!cols'] = colWidths;

    // Créer un nouveau classeur et ajouter la feuille de calcul
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pointages');

    // Exporter le fichier Excel
    XLSX.writeFile(wb, `Pointages_${this.selectedDate}.xlsx`);
}

  // Changer la date sélectionnée
  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Type assertion
    this.selectedDate = target.value;
}

  // Obtenir les dates disponibles
   getDates(): string[] {
    return Object.keys(this.groupedPointages);
  }

  // Obtenir les pointages pour une date donnée
  getPointagesByDate(date: string): Pointage[] {
    return this.groupedPointages[date] || [];
  }


  importerFichierExcel(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file); // Ajouter le fichier au FormData

    return this.http.post<string>('http://localhost:8081/nexus/pointages/import', formData);
  }

    // Méthode pour gérer la sélection du fichier
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    // Méthode pour envoyer le fichier au backend
    onUpload(): void {
      if (this.selectedFile) {
        this.importerFichierExcel(this.selectedFile).subscribe({
          next: (response) => {
            this.message = response; // Afficher le message de succès
          },
          error: (error) => {
            this.message = 'Erreur lors de l\'importation du fichier : ' + error.message;
          },
        });
      } else {
        this.message = 'Veuillez sélectionner un fichier Excel.';
      }
    }
}
