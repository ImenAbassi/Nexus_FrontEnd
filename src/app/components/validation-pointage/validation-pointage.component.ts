import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pointage } from 'src/app/models/Pointage.model';

@Component({
  selector: 'app-validation-pointage',
  templateUrl: './validation-pointage.component.html',
  styleUrls: ['./validation-pointage.component.css']
})
export class ValidationPointageComponent {
@ViewChild('importModal') importModal!: TemplateRef<any>; // Référence au template du modal
  pointages: Pointage[] = [];
  groupedPointages: { [key: string]: Pointage[] } = {}; // Données groupées par date
  selectedDate: string = new Date().toISOString().split('T')[0]; // Date du jour par défaut
  selectedFile: File | null = null;
  message: string = '';
  loading: boolean = false; // Indicateur de chargement
  @ViewChild('detailsModal') detailsModal!: TemplateRef<any>; // Référence au modal de détails
  selectedPointage: Pointage | null = null; // Stocke le pointage sélectionné

  constructor(private http: HttpClient, private modalService: NgbModal) {}

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
    this.loading = true; // Démarrer le chargement
    this.http.get<Pointage[]>('http://localhost:8081/nexus/pointages').subscribe(
      (data) => {
        this.pointages = data;
        console.log( this.pointages);
        this.groupPointagesByDate(); // Grouper les données par date
        this.loading = false; // Arrêter le chargement
      },
      (error) => {
        console.error('Erreur lors du chargement des pointages :', error);
        this.message = 'Une erreur est survenue lors du chargement des pointages. Veuillez réessayer plus tard.';
        this.loading = false; // Arrêter le chargement
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
    this.loading = true; // Démarrer le chargement
    setTimeout(() => { // Simuler une opération asynchrone
      const selectedDateObj = new Date(this.selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0);

      const pointagesFiltres = this.pointages.filter(pointage => {
        const datePointage = new Date(pointage.datePointage);
        datePointage.setHours(0, 0, 0, 0);
        return datePointage.getTime() === selectedDateObj.getTime();
      });

      const data = pointagesFiltres.map(pointage => ({
        'ID': pointage.id,
        'Utilisateur': pointage.user.nom + ' ' + pointage.user.prenom,
        'CIN': pointage.user.cin,
        'Heures Travaillées': pointage.heuresTravaillees + ' minutes',
        'Date Pointage': new Date(pointage.datePointage).toLocaleDateString(),
      }));

      const ws = XLSX.utils.json_to_sheet(data);

      const headers = [
        { header: 'ID', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Utilisateur', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'CIN', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Heures Travaillées', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } },
        { header: 'Date Pointage', style: { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4F81BD' } } } }
      ];

      const headerRange = XLSX.utils.decode_range(ws['!ref'] || 'A1:Z1');
      headers.forEach((header, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: index });
        ws[cellAddress] = { v: header.header, t: 's', s: header.style };
      });

      const colWidths = [
        { wch: 10 }, // ID
        { wch: 25 }, // Utilisateur
        { wch: 20 }, // CIN
        { wch: 20 }, // Heures Travaillées
        { wch: 20 }  // Date Pointage
      ];
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Pointages');
      XLSX.writeFile(wb, `Pointages_${this.selectedDate}.xlsx`);
      this.loading = false; // Arrêter le chargement
    }, 500); // Simuler une latence de 500ms
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

  // Importer un fichier Excel
  importerFichierExcel(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file); // Ajouter le fichier au FormData
    return this.http.post<string>('http://localhost:8081/nexus/pointages/import', formData);
  }

  // Méthode pour gérer la sélection du fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      this.selectedFile = file;
      this.message = ''; // Effacer tout message précédent
    } else {
      this.selectedFile = null;
      this.message = 'Veuillez sélectionner un fichier Excel valide (.xlsx ou .xls).';
    }
  }

  // Méthode pour envoyer le fichier au backend
  onUpload(): void {
    if (this.selectedFile) {
      this.loading = true; // Démarrer le chargement
      this.importerFichierExcel(this.selectedFile).subscribe({
        next: (response) => {
          this.showMessage(response); // Afficher le message
          this.loading = false; // Arrêter le chargement
        },
        error: (error) => {
          this.showMessage('Erreur lors de l\'importation du fichier : ' + error.message);
          this.loading = false; // Arrêter le chargement
        },
      });
    } else {
      this.showMessage('Veuillez sélectionner un fichier Excel.');
    }
  }

  // Afficher un message avec suppression automatique après 5 secondes
  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = ''; // Effacer le message après 5 secondes
    }, 5000);
  }

  openDetailsModal(pointage: Pointage): void {
    this.selectedPointage = pointage; // Définir le pointage sélectionné
    const modalRef = this.modalService.open(this.detailsModal, {
      centered: true,
      size: 'lg',
    });
  }
}