import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compagne } from 'src/app/models/Compagne.model';
import { Fonction, UserCompagne, UserCompagneDTO } from 'src/app/models/user.model';
import { CompagneService } from 'src/app/services/compagne.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-candidats',
  templateUrl: './all-candidats.component.html',
  styleUrls: ['./all-candidats.component.css']
})
export class AllCandidatsComponent implements OnInit {
  userForm!: FormGroup;
  compagnes: Compagne[] = [];
  fonctions = Object.values(Fonction); // Récupérer les valeurs de l'énumération Fonction
  usersWithoutSupervisorOrProjectLeader: UserCompagneDTO[] = [];
 // Variable pour la page actuelle (c'est tout ce que vous avez besoin d'ajouter)
 currentPage: number = 1;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private compagneService: CompagneService
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
      fonction: ['', Validators.required],
      dateHeureFormation: ['']
    });
    this.compagneService.getAllCompagnes().subscribe((compagnes) => {
      console.log('Compagnes récupérées:', compagnes);  // Vérification des données
      this.compagnes = compagnes;
    }, error => {
      console.error('Erreur lors de la récupération des compagnes:', error);  // Vérification des erreurs
    });
    this.getUsersWithoutSupervisorOrProjectLeader();

  }
  getUsersWithoutSupervisorOrProjectLeader(): void {
    this.userService.getUsersWithoutSupervisorOrProjectLeader().subscribe(
      (data: UserCompagneDTO[]) => {
        this.usersWithoutSupervisorOrProjectLeader = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  getCompagneNom(compagneId: number): string {
    const compagne = this.compagnes.find(c => c.id === compagneId);
    return compagne ? compagne?.nom ? compagne.nom : 'Inconnu'  : 'Inconnu'; // Retourner "Inconnu" si la compagne n'est pas trouvée
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
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
        fonction: formData.fonction,
        dateHeureFormation: formData.dateHeureFormation
      };

      this.userService.createUserAndAssignToCompagne(userCompagneDTO).subscribe(response => {
        console.log('Utilisateur ajouté et affecté à une compagne', response);
        // Redirection ou message de succès
      });
    }
  }
  openEditModal(userCompagne: UserCompagne): void {
    this.userForm.patchValue({
      userCompagneId: userCompagne.id,  // Ajouter l'ID de UserCompagne pour la mise à jour
      userId: userCompagne.user?.idUser,  // Récupérer l'ID de l'utilisateur
      cin: userCompagne.user?.cin,
      nom: userCompagne.user?.nom,
      prenom: userCompagne.user?.prenom,
      telPortable1: userCompagne.user?.telPortable1,
      adresseMail: userCompagne.user?.adresseMail,
      password: '',  // Vous pouvez laisser ce champ vide ou le rendre optionnel si non modifié
      compagneId: userCompagne.compagneId,
      fonction: userCompagne.fonction,
      dateAffectation: userCompagne.dateAffectation,
      dateFinAffectation: userCompagne.dateFinAffectation,
      dateHeureFormation: userCompagne.dateHeureFormation
    });
  }

  onSubmitUpdate(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      const userCompagneDTO: UserCompagneDTO = {
        userId: formData.userId,  // Assurez-vous que l'ID de l'utilisateur est correct
        compagneId: formData.compagneId,
        fonction: formData.fonction,
        dateAffectation: formData.dateAffectation,
        dateFinAffectation: formData.dateFinAffectation,
        dateHeureFormation: formData.dateHeureFormation
      };

      // Appeler le service pour mettre à jour l'utilisateur et la compagne
      this.userService.updateUserCompagne(formData.userCompagneId, userCompagneDTO).subscribe(response => {
        console.log('Utilisateur mis à jour', response);
        // Fermer le modal et éventuellement recharger la liste
      }, error => {
        console.error('Erreur lors de la mise à jour', error);
      });
    }
  }
  
}