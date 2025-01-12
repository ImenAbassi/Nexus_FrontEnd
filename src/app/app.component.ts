import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NexusGRH';
  showSidebar: boolean = true;

  constructor(private router: Router) {
    // Surveillez les changements de route
    this.router.events.subscribe(() => {
      // Si vous utilisez `data` dans les routes
      const currentRoute = this.router.routerState.snapshot.root.firstChild;
      if (currentRoute) {
        this.showSidebar = currentRoute.data['showSidebar'] ?? true;
      }
    });
  }
}
