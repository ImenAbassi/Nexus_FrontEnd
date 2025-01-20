import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggingOut = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.isLoggingOut = true;
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggingOut = false;
        localStorage.clear();
        //this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoggingOut = false;
        console.error('Erreur lors de la déconnexion', err);
       // this.router.navigate(['/login']); // Redirect even if logout fails
      }
    });
  }
}