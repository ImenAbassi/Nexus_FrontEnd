import { Component, OnInit } from '@angular/core';
import { CandidatDTO } from 'src/app/models/candidat-dto.model';
import { Compagne } from 'src/app/models/Compagne.model';
import { Sexe } from 'src/app/models/sexe.model';
import { CandidatService } from 'src/app/services/candidat.service';
import { CompagneService } from 'src/app/services/compagne.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-gestion-candidats',
  templateUrl: './gestion-candidats.component.html',
  styleUrls: ['./gestion-candidats.component.css']
})
export class GestionCandidatsComponent implements OnInit {
  candidats: CandidatDTO[] = [];
  candidat: CandidatDTO = {
    nom: '',
    prenom: '',
    sexe: { id: 0, nom: '' },
    cin: '',
    adresseMail: '',
    telPortable1: '',
    dateHeureFormation: new Date(), // Initialize with a default value
    compagne: undefined
  };
  sexes: Sexe[] = [];
  compagnes: Compagne[] = [];
  isEditing = false;
  loading = false;

  constructor(private candidatService: CandidatService, private sexeService: SexeService, private compagneService: CompagneService) { }

  ngOnInit(): void {
    this.loadCandidats();
    this.loadSexes();
    this.loadCompagnes();
  }

  loadCandidats(): void {
    this.loading = true;
    this.candidatService.getAll().subscribe(data => {
      this.candidats = data;
      this.loading = false;
    });
  }

  loadSexes(): void {
    this.sexeService.getAllSexes().subscribe(data => {
      this.sexes = data;
    });
  }

  compareCompagne(c1: any, c2: any): boolean {
    // Comparer les objets par leur identifiant (ou une autre propriété unique)
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  loadCompagnes(): void {
    this.compagneService.getAllCompagnes().subscribe(data => {
      this.compagnes = data;
    });
  }

  addCandidat(): void {
    this.candidatService.add(this.candidat).subscribe(() => {
      this.loadCandidats();
      this.resetForm();
    });
  }

  editCandidat(candidat: CandidatDTO): void {

    // Mettre à jour le candidat avec l'objet Compagne complet
    this.candidat = { ...candidat };
    this.isEditing = true;
  }

  updateCandidat(): void {
    if (this.candidat.id) {
      this.candidatService.update(this.candidat).subscribe(() => {
        this.loadCandidats();
        this.resetForm();
        this.isEditing = false;
      });
    }
  }

  deleteCandidat(id: number): void {
    this.candidatService.delete(id).subscribe(() => {
      this.loadCandidats();
    });
  }
  validateCandidat(id: number) {
    // Logique pour valider le candidat
    console.log(`Candidat avec l'ID ${id} validé`);
    // Vous pouvez appeler un service ici pour mettre à jour le statut du candidat
  }
  resetForm(): void {
    this.candidat = {
      nom: '',
      prenom: '',
      sexe: { id: 0, nom: '' },
      cin: '',
      adresseMail: '',
      telPortable1: '',
      dateHeureFormation: new Date(), // Reset to default value
      compagne: undefined
    };
  }
}