import { Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent /*implements OnInit*/ {
/*
  users: User[] = [];
  selectedUser: User | null = null; // Utilisateur sélectionné pour l'édition

  sexeOptions = sexeOptions;
  etatCivilOptions = etatCivilOptions;
  fonctionOptions = fonctionOptions;
  typeContratOptions = typeContratOptions;
  etatUserOptions = etatUserOptions;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  onSubmitEditForm(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.idUser, this.selectedUser).subscribe(
        (response) => {
          alert('Utilisateur mis à jour avec succès');
          this.loadUsers(); // Recharge les utilisateurs après mise à jour
        },
        (error) => {
          alert('Erreur lors de la mise à jour de l’utilisateur');
        }
      );
    }
  }

  onSubmitAddForm(addForm: NgForm): void {
   /* if (addForm.valid) {
      const newUser: User = addForm.value;
     this.userService.createUser(newUser).subscribe(
    (response) => {
          alert('Utilisateur ajouté avec succès');
          this.loadUsers(); // Recharge les utilisateurs après ajout
          addForm.reset(); // Réinitialiser le formulaire après l'ajout
        },
        (error) => {
          alert('Erreur lors de l’ajout de l’utilisateur');
        }
      );
    } else {
      alert('Veuillez remplir correctement le formulaire.');
    }
  }
/*
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Recharge la liste après suppression
    });
  }*/
  
}
