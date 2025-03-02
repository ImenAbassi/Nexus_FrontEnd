import { Component, OnInit, TemplateRef } from '@angular/core';
import { PointageService } from '../../services/pointage.service';
import { Pointage } from 'src/app/models/Pointage.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCompagne } from 'src/app/models/user.model';
import { userCompagneService } from 'src/app/services/userCompagne.service';
import { PrivilegeService } from 'src/app/services/PrivilegeService.service';
import { TypePointageService } from 'src/app/services/type-pointage.service';

@Component({
  selector: 'app-gestion-pointage',
  templateUrl: './gestion-pointage.component.html',
  styleUrls: ['./gestion-pointage.component.css']
})
export class GestionPointageComponent implements OnInit {
  selectedPointageOperations: any[] = [];

  currentPointageId: number | undefined; 
  filteredPointages: Pointage[] = []; 
  pointages: Pointage[] = [];
  users: UserCompagne[] = [];
  form: FormGroup;
  operationTypes:any[] = []; 
  operations:any[]=[];
  itemsPerPage = 7;
  currentPage = 1;
  totalPages = 1;
superviseur = false;
chefProjet = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private pointageService: PointageService,
    private userService: userCompagneService,
    private privilegeService: PrivilegeService,
    private service: TypePointageService

  ) {
    this.superviseur =this.privilegeService.hasPrivilege(['Validation_Pointage_Superviseur']);
    this.chefProjet =this.privilegeService.hasPrivilege(['Validation_Pointage_ChefProjet']);
    this.form = this.fb.group({
      id: [null], // Valeur par défaut null pour l'ID
      userId: ['', Validators.required], // Champ obligatoire
      retard: [0, [Validators.required, Validators.min(0)]], // Retard doit être un nombre positif
      totalHeure: [0, [Validators.required, Validators.min(0)]], // Total des heures doit être un nombre positif
      datePointage: [null, Validators.required] // Date obligatoire
    });

  }

  ngOnInit(): void {
    this.loadAllTypes();
    this.loadPointages();
    this.loadUsers();
  }
  openOperationsModal(modal: any, pointage: Pointage): void {
    this.selectedPointageOperations = pointage.listOperation || [];
    this.modalService.open(modal, { size: 'lg' });
  }
  get totalPagesArray(): number[] {
    return Array.from({ length: Math.ceil(this.pointages.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPagesArray.length) {
      this.currentPage = page;
    }
  }

  loadAllTypes(){
    this.service.getAll().subscribe(
      (data) => {
        this.operationTypes = data;
      }
    );
  }

  loadPointages(): void {
    this.pointageService.getAll().subscribe(data => {
      this.pointages = data;
   //   this.filterPointagesByDate(new Date());
    });
  }

 /* filterPointagesByDate(date: Date): void {
    const dateString = date.toISOString().split('T')[0]; // Convertir la date en format YYYY-MM-DD
    this.filteredPointages = this.pointages.filter(pointage => {
      const pointageDate = new Date(pointage.datePointage).toISOString().split('T')[0];
      return pointageDate === dateString;
    });
  }*/

  loadUsers(): void {
    if (this.privilegeService.hasPrivilege(['Validation_Pointage_Superviseur'])) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        const userId = user.idUser;
        this.userService.getUserCompagnesBySupervisor(userId).subscribe(data => {
          this.users = data;
          console.log(this.users);

        });
      }
    } else {
      this.userService.getAll().subscribe(data => {
        this.users = data;
        console.log(this.users);

      });
    }
  }

  openModal(template: TemplateRef<any>, pointage?: Pointage): void {
    this.resetForm(pointage);
    this.modalService.open(template, { size: 'lg' });
  }

  resetForm(pointage?: Pointage): void {
    this.operations = [];
    pointage?.listOperation.forEach((action)=>{
      this.operations.push(
        {
          typePointage: action.typePointage.id, // Initialisé vide
      totalHeure: action.totalHeure 
        }
      );
    });
    //this.operations = pointage?.listOperation || [];
    this.form = this.fb.group({
      id: [pointage?.id],
      userId: [pointage?.user?.id, Validators.required],
      retard: [pointage?.retard, [Validators.required, Validators.min(0)]],
      totalHeure: [pointage?.totalHeure, [Validators.required, Validators.min(0)]],
      datePointage: [pointage?.datePointage, Validators.required]
    });
  }


  

  addOperation(): void {
    this.operations.push({
      typePointage: '', // Initialisé vide
      totalHeure: null // Initialisé à null (ou 0 selon vos besoins)
    });
  }

  // Supprimer une opération par son index
  removeOperation(index: number): void {
    if (index >= 0 && index < this.operations.length) {
      this.operations.splice(index, 1); // Utiliser splice pour supprimer l'élément
    }
  }

  onSubmit(action: string): void {
    // Vérification si le formulaire est invalide
    if (this.form.invalid) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }

    // Création d'un nouvel objet Pointage
    const pointage = new Pointage();

    // Affectation des valeurs du formulaire à l'objet Pointage
    pointage.datePointage = this.form.value.datePointage || null; // Assurez-vous que la date est valide
    pointage.etatDemande = 'EN_ATTENTE'; // État par défaut
    pointage.retard = this.form.value.retard || 0; // Retard par défaut à 0 si non défini
    pointage.totalHeure = this.form.value.totalHeure || 0; // Heures totales par défaut à 0 si non défini
    if(this.operations.length>0){
      this.operations.forEach((action)=>{
        const type = this.operationTypes.find(u => u.id == action.typePointage);
        pointage.listOperation.push({
          typePointage: type, // Initialisé vide
      totalHeure: action.totalHeure 
        });
      });
      //pointage.listOperation = this.operations;
    }
    
    // Recherche de l'utilisateur correspondant à l'ID spécifié dans le formulaire
    const userId = this.form.value.userId;
    const user = this.users.find(u => u.id == userId);

    if (!user) {
        alert('Utilisateur introuvable. Veuillez vérifier l\'ID utilisateur.');
        return;
    }

    pointage.user = user; // Attribuer l'utilisateur trouvé à l'objet Pointage

    console.log('Données du formulaire :', this.form.value);
    console.log('Objet Pointage créé :', pointage);

    // Gestion des différentes actions
    switch (action) {
        case 'add':
            this.createPointage(pointage);
            break;

        case 'edit':
            if (!this.form.value.id) {
                alert('Impossible de modifier : ID manquant.');
                return;
            }
            pointage.id = this.form.value.id; // Ajoute l'ID existant au pointage
            this.updatePointage(pointage);
            break;

        case 'validate':
            if (!this.form.value.id) {
                alert('Impossible de valider : ID manquant.');
                return;
            }
            this.validatePointage(this.form.value.id);
            break;

        default:
            alert('Action non reconnue.');
            return;
    }
}

  createPointage(pointage: Pointage): void {
    this.pointageService.createWithOperation(pointage).subscribe(() => {
      alert('Pointage ajouté avec succès');
      this.modalService.dismissAll();
      this.loadPointages();
    });
  }

  updatePointage(pointage: Pointage): void {
    this.pointageService.updateWithOperation(this.form.value.id!, pointage).subscribe(() => {
      alert('Pointage mis à jour avec succès');
      this.modalService.dismissAll();
      this.loadPointages();
    });
  }

  validatePointage(id: number): void {
    this.pointageService.validate(id).subscribe(() => {
      alert('Pointage validé avec succès');
      this.modalService.dismissAll();
      this.loadPointages();
    });
  }

  deletePointage(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pointage ?')) {
      this.pointageService.delete(id).subscribe(() => {
        alert('Pointage supprimé avec succès');
        this.loadPointages();
      });
    }
  }

  openValiderModal(content: any,id: number): void {
    this.currentPointageId = id;
    this.modalService.open(content, { centered: true });
  }

  refuserValider(modal: any,etat:string): void {
    if (this.currentPointageId) {
    console.log('Demande refusée pour l\'ID :', this.currentPointageId);
    this.pointageService.validerRefuser(this.currentPointageId, etat).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Erreur lors de la validation par le chef de projet', error);
        alert('Une erreur est survenue lors de la validation par le chef de projet.');
      }
    );
  }
    modal.close();
  }

  // Gère l'action "Valider"
  confirmerValider(modal: any,etat:string): void {
    if (this.currentPointageId) {
      console.log('Demande validée pour l\'ID :', this.currentPointageId);
      // Appel à votre service ou logique de validation ici
      this.pointageService.validerRefuser(this.currentPointageId, etat).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Erreur lors de la validation par le chef de projet', error);
          alert('Une erreur est survenue lors de la validation par le chef de projet.');
        }
      );
    }
    modal.close();
  }


}