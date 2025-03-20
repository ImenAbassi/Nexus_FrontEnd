import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatCivilService } from 'src/app/services/etat-civil.service';
import { SexeService } from 'src/app/services/sexe.service';
import { SiteService } from 'src/app/services/site.service';
import { SocieteService } from 'src/app/services/societe.service';
import { TypeContratService } from 'src/app/services/type-contrat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent {
/* user: any = {
    prenom: '',
    nom: '',
    nomJeuneFille: '',
    etatCivil: null,
    sexe: null,
    dateNaissance: null,
    lieuNaissance: '',
    cin: '',
    delivreeLe: null,
    delivreeA: '',
    adresseMail: '',
    adresseMailPro: '',
    adresseCIN: '',
    adressePersonnelle2: '',
    adressePersonnelle3: '',
    codePostal: '',
    ville: '',
    telFixe: '',
    telPortable1: '',
    telPortable2: '',
    nationalite: '',
    cnssCnrps: '',
    banque: '',
    agence: '',
    rib: '',
    matricule: '',
    photoCin: null,
    description: '',
    password: '',
    typeContrat: null,
    dateEntree: null,
    dateDebutContrat: null,
    dateFinContrat: null,
    photoDiplome: null,
    photoProfil: null,
    salaire: 0,
    societe: null,
    site: null,
  };*/
  @Input() user: any={
    prenom: '',
    nom: '',
    nomJeuneFille: '',
    etatCivil: null,
    sexe: null,
    dateNaissance: null,
    lieuNaissance: '',
    cin: '',
    delivreeLe: null,
    delivreeA: '',
    adresseMail: '',
    adresseMailPro: '',
    adresseCIN: '',
    adressePersonnelle2: '',
    adressePersonnelle3: '',
    codePostal: '',
    ville: '',
    telFixe: '',
    telPortable1: '',
    telPortable2: '',
    nationalite: '',
    cnssCnrps: '',
    banque: '',
    agence: '',
    rib: '',
    matricule: '',
    photoCin: null,
    description: '',
    password: '',
    typeContrat: null,
    dateEntree: null,
    dateDebutContrat: null,
    dateFinContrat: null,
    photoDiplome: null,
    photoProfil: null,
    salaire: 0,
    societe: null,
    site: null,
  };
@Input() idUser:any;
  isEditMode = false;
  etatCivils: any[] = [];
  sexes: any[] = [];
  typeContrats: any[] = [];
  societes: any[] = [];
  sites: any[] = [];

  constructor(
    private userService: UserService,
    private etatCivilService: EtatCivilService,
    private sexeService: SexeService,
    private typeContratService: TypeContratService,
    private societeService: SocieteService,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   
      //this.isEditMode = true;
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        const userId = user.idUser;
        console.log(userId);        console.log(user);

      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (error) => {
          console.error('Error fetching user:', error);
        },
      });
    
    }
    this.loadDropdowns();
  }

  loadDropdowns(): void {
    this.etatCivilService.getAllEtatCivils().subscribe((data) => (this.etatCivils = data));
    this.sexeService.getAllSexes().subscribe((data) => (this.sexes = data));
    this.typeContratService.getAllTypeContrats().subscribe((data) => (this.typeContrats = data));
    this.societeService.getAllSocietes().subscribe((data) => (this.societes = data));
    this.siteService.getSites().subscribe((data) => (this.sites = data));
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user.idUser, this.user).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    } else {
      this.userService.addUser(this.user).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error adding user:', error);
        },
      });
    }
  }

  compareFn(type1: any, type2: any): boolean {
    return type1 && type2 ? type1.id === type2.id : type1 === type2;
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user[field] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }
}

