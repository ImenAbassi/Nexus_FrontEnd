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

  constructor(private candidatService: CandidatService, private sexeService: SexeService,private compagneService:CompagneService) { }

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