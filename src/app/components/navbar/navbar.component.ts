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
  userName:any;
  userImage: string | null = null;
  initials: string = '';
  
  constructor(private authService: AuthService, private router: Router) {
    // Récupérer l'utilisateur depuis localStorage
    const userString = localStorage.getItem('user');
  
    if (userString) {
      const user = JSON.parse(userString); // Désérialiser l'objet user
      this.userName = user?.nom + ' ' + user?.prenom; // Utiliser l'opérateur de chaînage optionnel

      // Vérifier si une image existe
      if (user.image) {
        this.userImage = user.image; // Afficher l'image si elle existe
      } else {
        // Extraire les initiales du nom et du prénom
        this.initials = this.getInitials(user.nom, user.prenom);
      }
    } else {
      this.userName = 'Utilisateur Nexus';
      this.initials = 'U'; // Valeur par défaut si user n'existe pas
    }
  }
  
  // Méthode pour extraire les initiales
  getInitials(nom: string, prenom: string): string {
    const firstLetterNom = nom ? nom.charAt(0).toUpperCase() : '';
    const firstLetterPrenom = prenom ? prenom.charAt(0).toUpperCase() : '';
    return `${firstLetterNom}${firstLetterPrenom}`;
  }
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