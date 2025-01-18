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
        // Store the user and token separately in localStorage
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user data
        localStorage.setItem('token', response.token); // Store the token (no need to stringify if it's already a string)
  
        this.message = 'Authentification réussie'; // Display success message
        console.log('Authentification réussie:', response);
        this.router.navigate(['/home']); // Redirect to /home after successful authentication
      },
      (error) => {
        this.message = 'Verifier login et mot de passe'; // Error message if authentication fails
        console.error('Erreur d\'authentification:', error);
      }
    );
  }
  
  
}