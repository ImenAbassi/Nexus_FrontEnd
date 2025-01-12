import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  cin: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.cin, this.password).subscribe(
      (response) => {
        this.message = response;  // Affiche la réponse texte (ex : "Authentification réussie")
        console.log('Authentification réussie:', response);
        this.router.navigate(['/home']);  // Rediriger vers /home après authentification réussie

      },
      (error) => {
        this.message = 'Verifier login et mot de passe';  // Message d'erreur si l'authentification échoue
        console.error('Erreur d\'authentification:', error);
      }
    );
  }
  
  
}