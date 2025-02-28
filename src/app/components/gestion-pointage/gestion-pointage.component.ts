import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pointage } from '../../models/Pointage.model';
import { PointageOperation } from '../../models/PointageOperation.modal';
import { PointageService } from '../../services/pointage.service';
import * as XLSX from 'xlsx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestion-pointage',
  templateUrl: './gestion-pointage.component.html',
  styleUrls: ['./gestion-pointage.component.css']
})
export class GestionPointageComponent  implements OnInit{
  compagne: string = ''; // Variable for campagne
  type: string = 'ENTREE'; // Variable for type with default value
  heure: string | null = null; // Variable for heure
  operationId: number | null = null; // Variable for operation ID
  pointages: Pointage[] = [];
  selectedPointage?: Pointage;
  newPointage: Pointage = { id: 0, datePointage: null, operations: [], user: null, etatDemande: '', heuresTravaillees: 0 };
  selectedOperation: PointageOperation = { id: 0, type: '', heure: null, compagne: ''};

  // Variables for filtering by date
  selectedDate: string = '';
  loading: boolean = false;
  message: string = '';

  @ViewChild('detailsModal') detailsModalTemplate!: TemplateRef<any>;
  @ViewChild('operationModal') operationModalTemplate!: TemplateRef<any>;

  constructor(private pointageService: PointageService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadPointages();
  }

  loadPointages(): void {
    this.loading = true;
    this.pointageService.getAllPointages().subscribe(
      (data) => {
        this.pointages = data;
        this.loading = false;
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors du chargement des pointages.';
        this.loading = false;
      }
    );
  }

  createPointagesBySupervisor(): void {
    if (!this.selectedDate) {
      this.message = 'Veuillez sélectionner une date.';
      return;
    }
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser; 
      this.pointageService.createPointagesBySupervisor(userId, this.selectedDate).subscribe(
        (data) => {
          this.loadPointages();
          this.message = `Pointages créés avec succès pour ${data.length} utilisateurs.`;
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de la création des pointages.';
        }
      );
    }
  }

  selectPointage(pointage: Pointage): void {
    this.selectedPointage = pointage;
  }

  addOperationToSelectedPointage(): void {
    if (!this.selectedPointage?.id) {
      this.message = 'Aucun pointage sélectionné.';
      return;
    }
    this.pointageService.addOperationToPointage(this.selectedPointage.id, this.selectedOperation).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Nouvelle opération ajoutée avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de l\'ajout de l\'opération.';
      }
    );
  }


  openOperationModal(operation?: PointageOperation): void {
    if (operation) {
      this.operationId = operation.id; // Set operation ID if editing
      this.compagne = operation.compagne || '';
      this.type = operation.type || 'ENTREE';
      this.heure = operation.heure ? new Date(operation.heure).toISOString().slice(0, 16) : null; // Format datetime-local
    } else {
      this.operationId = null; // Reset ID for new operation
      this.compagne = '';
      this.type = 'ENTREE';
      this.heure = null;
    }
        this.modalService.open(this.operationModalTemplate, { centered: true });
  }

  saveOperation(): void {
    if (!this.selectedPointage?.id ) {
      this.message = 'Aucun pointage ou opération sélectionnée.';
      return;
    }
    const operationData = {
      id: this.operationId,
      compagne: this.compagne,
      type: this.type,
      heure: this.heure ? new Date(this.heure) : null // Convert back to Date
    };
    if (operationData.id) {
      // Update operation
      this.pointageService.updateOperation(operationData.id, operationData).subscribe(
        () => {
          this.loadPointages();
          this.message = 'Opération mise à jour avec succès.';
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de la mise à jour de l\'opération.';
        }
      );
    } else {
      // Add new operation
      this.pointageService.addOperationToPointage(this.selectedPointage.id, operationData).subscribe(
        () => {
          this.loadPointages();
          this.message = 'Nouvelle opération ajoutée avec succès.';
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de l\'ajout de l\'opération.';
        }
      );
    }
    this.modalService.dismissAll();
  }

  deleteOperation(): void {
    if (!this.selectedOperation?.id) {
      this.message = 'Aucune opération sélectionnée.';
      return;
    }
    this.pointageService.deleteOperation(this.selectedOperation.id).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Opération supprimée avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la suppression de l\'opération.';
      }
    );
    this.modalService.dismissAll();
  }

  validatePointage(): void {
    if (!this.selectedPointage?.id) {
      this.message = 'Aucun pointage sélectionné.';
      return;
    }
    this.selectedPointage.etatDemande = 'Validé'; // Set validation status
    this.pointageService.updatePointage(this.selectedPointage.id, this.selectedPointage).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Pointage validé avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la validation du pointage.';
      }
    );
  }

  deletePointage(pointageId: number): void {
    this.pointageService.deletePointage(pointageId).subscribe(
      () => {
        this.message = 'Pointage supprimé avec succès.';
        // Refresh the list of pointages or perform other actions
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la suppression du pointage.';
      }
    );
  }

  getPointagesByDate(date: string): Pointage[] {
    return this.pointages.filter((p) => p.datePointage === date);
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.getPointagesByDate(this.selectedDate));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pointages');
    XLSX.writeFile(workbook, 'pointages.xlsx');
  }

  openDetailsModal(pointage: Pointage): void {
    this.selectedPointage = pointage;
    this.modalService.open(this.detailsModalTemplate, { centered: true, size: 'lg' });
  }
}