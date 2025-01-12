import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-gestion-site',
  templateUrl: './gestion-site.component.html',
  styleUrls: ['./gestion-site.component.css']
})
export class GestionSiteComponent implements OnInit {
  sites: Site[] = [];
  currentPage: number = 1;
  site: Site = { nom: '', description: '', adresse: '' };
  modalTitle: string = '';
  modalButtonLabel: string = '';

  constructor(
    private siteService: SiteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getSites();
  }

  // Récupérer les sites
  getSites(): void {
    this.siteService.getSites().subscribe(
      (data) => {
        this.sites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des sites', error);
      }
    );
  }

  // Afficher le modal
  openModal(content: any, action: string, site?: Site): void {
    this.modalTitle = action === 'add' ? 'Ajouter un Site' : 'Modifier un Site';
    this.modalButtonLabel = action === 'add' ? 'Ajouter' : 'Modifier';
    this.site = site ? { ...site } : { nom: '', description: '', adresse: '' };

    // Ouvre le modal
    this.modalService.open(content, { ariaLabelledBy: 'siteModalLabel' });
  }

  // Sauvegarder le site
  saveSite(modal: any): void {
    if (this.site.id) {
      this.siteService.updateSite(this.site).subscribe(
        () => {
          this.getSites();
          alert('Site mis à jour avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du site', error);
        }
      );
    } else {
      this.siteService.createSite(this.site).subscribe(
        () => {
          this.getSites();
          alert('Site ajouté avec succès!');
          modal.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du site', error);
        }
      );
    }
  }

  // Supprimer un site
  deleteSite(id: number | undefined): void {
    if (id) {
      this.siteService.deleteSite(id).subscribe(
        () => {
          this.getSites();
          alert('Site supprimé avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression du site', error);
        }
      );
    }
  }
}
