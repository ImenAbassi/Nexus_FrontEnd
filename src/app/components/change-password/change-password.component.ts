import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userId = user.idUser;
    this.userService.changePassword(userId, this.oldPassword, this.newPassword).subscribe(
      (response) => {
        alert('Mot de passe mis à jour avec succès.');
        this.router.navigate(['/profile']);
      },
      (error) => {
        alert('Ancien mot de passe incorrect ou erreur lors de la mise à jour.');
      }
    );
  }}
}
