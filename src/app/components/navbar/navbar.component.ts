import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private authService: AuthService, private router: Router) {}
  onLogout() {
    this.router.navigate(['/login']);

  }
  /*onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        // Si la déconnexion réussit, redirigez l'utilisateur vers la page de connexion
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
      }
    });
  }*/
  

}
