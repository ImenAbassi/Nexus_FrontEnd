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
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.message = 'Authentification réussie';
        this.router.navigate(['/home']);
      },
      (error) => {
        this.message = 'Verifier login et mot de passe';
        console.error('Erreur d\'authentification:', error);
      }
    );
  }
  
  
}