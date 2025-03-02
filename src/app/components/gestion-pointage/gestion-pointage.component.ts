import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PointageService } from '../../services/pointage.service';
import * as XLSX from 'xlsx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-pointage',
  templateUrl: './gestion-pointage.component.html',
  styleUrls: ['./gestion-pointage.component.css']
})
export class GestionPointageComponent implements OnInit {
  pointages: any[] = [];
  selectedPointage?: any;
  selectedOperation?: any;

  // Formulaire réactif pour gérer les opérations
  operationForm: FormGroup;

  // Variables pour filtrer par date et afficher des messages
  selectedDate: string = '';
  message: string = '';

  @ViewChild('detailsModal') detailsModalTemplate!: TemplateRef<any>;
  @ViewChild('operationModal') operationModalTemplate!: TemplateRef<any>;

  constructor(
    private pointageService: PointageService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.operationForm = this.fb.group({
      compagne: ['', Validators.required],
      type: ['ENTREE', Validators.required],
      heure: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPointages();
  }

  /**
   * Charger tous les pointages depuis le service
   */
  loadPointages(): void {
    this.pointageService.getAllPointages().subscribe(
      (data) => {
        this.pointages = data || [];
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors du chargement des pointages.';
        console.error(error);
      }
    );
  }

  /**
   * Créer des pointages pour un superviseur donné
   */
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

  /**
   * Sélectionner un pointage spécifique
   * @param pointage - Le pointage à sélectionner
   */
  selectPointage(pointage: any): void {
    this.selectedPointage = pointage;
  }

  /**
   * Ouvrir le modal pour ajouter ou modifier une opération
   * @param operation - L'opération à éditer (facultatif)
   */
  openOperationModal(operation?: any): void {
    if (operation) {
      this.operationForm.patchValue({
        id: operation.id,
        compagne: operation.compagne || '',
        type: operation.type || 'ENTREE',
        heure: operation.heure ? new Date(operation.heure).toISOString().slice(0, 16) : null
      });
    } else {
      this.operationForm.reset({ type: 'ENTREE' });
    }

    this.modalService.open(this.operationModalTemplate, { centered: true });
  }

  /**
   * Enregistrer ou mettre à jour une opération
   */
  saveOperation(): void {
    if (this.operationForm.invalid) {
      this.message = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const operationData = this.operationForm.value;

    if (!this.selectedPointage?.id) {
      this.message = 'Aucun pointage sélectionné.';
      return;
    }

    if (operationData.id) {
      // Mettre à jour une opération existante
      this.pointageService.updateOperation(operationData.id, operationData).subscribe(
        () => {
          this.loadPointages();
          this.message = 'Opération mise à jour avec succès.';
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de la mise à jour de l\'opération.';
          console.error(error);
        }
      );
    } else {
      // Ajouter une nouvelle opération
      this.pointageService.addOperationToPointage(this.selectedPointage.id, operationData).subscribe(
        () => {
          this.loadPointages();
          this.message = 'Nouvelle opération ajoutée avec succès.';
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de l\'ajout de l\'opération.';
          console.error(error);
        }
      );
    }

    this.modalService.dismissAll();
  }

  /**
   * Supprimer une opération
   */
  deleteOperation(operationId: number): void {
    if (!operationId) {
      this.message = 'Aucune opération sélectionnée.';
      return;
    }

    this.pointageService.deleteOperation(operationId).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Opération supprimée avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la suppression de l\'opération.';
        console.error(error);
      }
    );
  }

  /**
   * Valider un pointage
   */
  validatePointage(): void {
    if (!this.selectedPointage?.id) {
      this.message = 'Aucun pointage sélectionné.';
      return;
    }

    this.selectedPointage.etatDemande = 'APPROUVEE';
    this.pointageService.updatePointage(this.selectedPointage.id, this.selectedPointage).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Pointage validé avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la validation du pointage.';
        console.error(error);
      }
    );
  }

  /**
   * Supprimer un pointage
   * @param pointageId - ID du pointage à supprimer
   */
  deletePointage(pointageId: number): void {
    this.pointageService.deletePointage(pointageId).subscribe(
      () => {
        this.loadPointages();
        this.message = 'Pointage supprimé avec succès.';
      },
      (error) => {
        this.message = 'Une erreur s\'est produite lors de la suppression du pointage.';
        console.error(error);
      }
    );
  }

  /**
   * Filtrer les pointages par date
   * @param date - La date à filtrer
   * @returns Les pointages correspondants à la date donnée
   */
  getPointagesByDate(date: string): any[] {
    return this.pointages.filter((p) => p.datePointage === date);
  }

  /**
   * Gérer le changement de date dans le filtre
   * @param event - Événement de changement de date
   */
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
  }

  /**
   * Exporter les pointages vers Excel
   */
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.getPointagesByDate(this.selectedDate));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pointages');
    XLSX.writeFile(workbook, 'pointages.xlsx');
  }

  /**
   * Ouvrir le modal de détails d'un pointage
   * @param pointage - Le pointage à afficher
   */
  openDetailsModal(pointage: any): void {
    this.selectedPointage = pointage;
    this.modalService.open(this.detailsModalTemplate, { centered: true, size: 'lg' });
  }
}