import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Compagne } from 'src/app/models/Compagne.model';
import { Fonction } from 'src/app/models/fonction.model';
import { UserCompagne } from 'src/app/models/user.model';
import { UserCompagneDTO } from 'src/app/models/UserCompagneDTO.model';
import { CompagneService } from 'src/app/services/compagne.service';
import { FonctionService } from 'src/app/services/fonction.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-candidats',
  templateUrl: './all-candidats.component.html',
  styleUrls: ['./all-candidats.component.css']
})
export class AllCandidatsComponent implements OnInit {
  userForm!: FormGroup;
  compagnes: Compagne[] = [];
  fonctions: Fonction[] = [];
  usersWithoutSupervisorOrProjectLeader: UserCompagne[] = [];
  currentPage: number = 1;
  loading: boolean = false; // Variable pour gérer l'état de chargement
  idUser: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private compagneService: CompagneService,
    private fonctionService: FonctionService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telPortable1: ['', Validators.required],
      adresseMail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      compagneId: ['', Validators.required],
      fonction: [null, Validators.required],
      dateHeureFormation: ['']
    });

    this.loadData(); // Charger les données au démarrage
  }

  // Méthode pour charger les données
  loadData(): void {
    this.loading = true; // Activer le loading

    forkJoin({
      fonctions: this.fonctionService.getAllFonctions(),
      compagnes: this.compagneService.getAllCompagnes()
    }).subscribe({
      next: (results) => {
        this.fonctions = results.fonctions;
        this.compagnes = results.compagnes;
        console.log('Compagnes récupérées:', results.compagnes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.loading = false; // Désactiver le loading en cas d'erreur
      },
      complete: () => {
        this.getUsersWithoutSupervisorOrProjectLeader();
        this.loading = false; // Désactiver le loading une fois les données chargées
      }
    });
  }

  // Méthode pour récupérer les utilisateurs sans superviseur ou chef de projet
  getUsersWithoutSupervisorOrProjectLeader(): void {
    this.loading = true; // Activer le loading

    this.userService.getUsersWithoutSupervisorOrProjectLeader().subscribe(
      (data: UserCompagne[]) => {
        this.usersWithoutSupervisorOrProjectLeader = data;
        this.loading = false; // Désactiver le loading une fois les données chargées
      },
      (error) => {
        console.error('Error fetching users', error);
        this.loading = false; // Désactiver le loading en cas d'erreur
      }
    );
  }

  // Méthode pour obtenir le nom de la compagne
  getCompagneNom(compagneId: number): string {
    const compagne = this.compagnes.find(c => c.id === compagneId);
    return compagne ? compagne?.nom ? compagne.nom : 'Inconnu' : 'Inconnu';
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true; // Activer le loading

      const formData = this.userForm.value;
      const userCompagneDTO: UserCompagneDTO = {
        user: {
          cin: formData.cin,
          nom: formData.nom,
          prenom: formData.prenom,
          telPortable1: formData.telPortable1,
          adresseMail: formData.adresseMail,
          password: formData.password,
        },
        compagneId: formData.compagneId,
        fonctionId: formData.fonction,
        dateAffectation: formData.dateAffectation,
        dateFinAffectation: formData.dateFinAffectation,
        dateHeureFormation: formData.dateHeureFormation
      };

      this.userService.createUserAndAssignToCompagne(userCompagneDTO).subscribe({
        next: (response) => {
          console.log('Utilisateur ajouté et affecté à une compagne', response);
          this.loading = false; // Désactiver le loading
          this.refresh(); // Rafraîchir les données après l'ajout
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
          this.loading = false; // Désactiver le loading en cas d'erreur
        }
      });
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  // Méthode pour ouvrir le modal d'édition
  openEditModal(userCompagne: any): void { 
    console.log(userCompagne);
    this.idUser = userCompagne.id;
    this.userForm.patchValue({
      userCompagneId: userCompagne.id,
      userId: userCompagne.user?.idUser,
      cin: userCompagne.user?.cin,
      nom: userCompagne.user?.nom,
      prenom: userCompagne.user?.prenom,
      telPortable1: userCompagne.user?.telPortable1,
      adresseMail: userCompagne.user?.adresseMail,
      password: '',
      compagneId: userCompagne.compagneId,
      fonction: userCompagne.fonction.id,
      dateAffectation: userCompagne.dateAffectation,
      dateFinAffectation: userCompagne.dateFinAffectation,
      dateHeureFormation: userCompagne.dateHeureFormation
    });
  }

  // Méthode pour soumettre la mise à jour
  onSubmitUpdate(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.loading = true; // Activer le loading

      const formData = this.userForm.value;
      const userCompagneDTO: UserCompagneDTO = {
        id: this.idUser,
        user: {
          idUser: formData.userId,
          cin: formData.cin,
          nom: formData.nom,
          prenom: formData.prenom,
          telPortable1: formData.telPortable1,
          adresseMail: formData.adresseMail,
          password: formData.password,
        },
        compagneId: formData.compagneId,
        fonctionId: formData.fonction,
        dateAffectation: formData.dateAffectation,
        dateFinAffectation: formData.dateFinAffectation,
        dateHeureFormation: formData.dateHeureFormation
      };

      this.userService.updateUserCompagne(this.idUser, userCompagneDTO).subscribe({
        next: (response) => {
          console.log('Utilisateur mis à jour', response);
          this.loading = false; // Désactiver le loading
          this.refresh(); // Rafraîchir les données après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
          this.loading = false; // Désactiver le loading en cas d'erreur
        }
      });
    }
  }

  // Méthode pour rafraîchir les données
  refresh(): void {
    this.loadData(); // Recharge les données
  }

  // Méthode pour exporter en Excel
  exportToExcel(): void {
    const data = this.usersWithoutSupervisorOrProjectLeader.map(user => ({
      'CAMPAGNES': this.getCompagneNom(user.compagneId || 0),
      'CIN': user.user?.cin,
      'Nom & Prénom': `${user.user?.prenom} ${user.user?.nom}`,
      'Téléphone': user.user?.telPortable1,
      'Email': user.user?.adresseMail,
      'FONCTION': user.fonction?.nom,
      'Date Formation': user.dateHeureFormation ? new Date(user.dateHeureFormation).toLocaleString() : ''
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, 'candidats');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_export_${new Date().getTime()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}