import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCampagneComponent } from "./components/add-campagne/add-campagne.component";
import { AddCongeComponent } from "./components/add-conge/add-conge.component";
import { AddPlanningComponent } from "./components/add-planning/add-planning.component";
import { AllCandidatsComponent } from "./components/all-candidats/all-candidats.component";
import { AllUsersComponent } from "./components/all-users/all-users.component";
import { GestionCiblesComponent } from "./components/gestion-cibles/gestion-cibles.component";
import { GestionEtatCivilComponent } from "./components/gestion-etat-civil/gestion-etat-civil.component";
import { GestionFonctionComponent } from "./components/gestion-fonction/gestion-fonction.component";
import { GestionHeureDepartComponent } from "./components/gestion-heure-depart/gestion-heure-depart.component";
import { GestionJoursFeriesComponent } from "./components/gestion-jours-feries/gestion-jours-feries.component";
import { GestionJoursSemaineComponent } from "./components/gestion-jours-semaine/gestion-jours-semaine.component";
import { GestionLanguesComponent } from "./components/gestion-langues/gestion-langues.component";
import { GestionPaysComponent } from "./components/gestion-pays/gestion-pays.component";
import { GestionPlanningComponent } from "./components/gestion-planning/gestion-planning.component";
import { GestionSexeComponent } from "./components/gestion-sexe/gestion-sexe.component";
import { GestionSiteComponent } from "./components/gestion-site/gestion-site.component";
import { GestionSocieteComponent } from "./components/gestion-societes/gestion-societes.component";
import { GestionTypeActionComponent } from "./components/gestion-type-action/gestion-type-action.component";
import { GestionTypeAttestationComponent } from "./components/gestion-type-attestation/gestion-type-attestation.component";
import { GestionTypeCongeComponent } from "./components/gestion-type-conge/gestion-type-conge.component";
import { GestionTypeContratComponent } from "./components/gestion-type-contrat/gestion-type-contrat.component";
import { GestionTypologieCanalComponent } from "./components/gestion-typologie-canal/gestion-typologie-canal.component";
import { GestionTypologieComponent } from "./components/gestion-typologie/gestion-typologie.component";
import { HomeComponent } from "./components/home/home.component";
import { ListAttestationTravailComponent } from "./components/list-attestation-travail/list-attestation-travail.component";
import { ListCampagnesComponent } from "./components/list-campagnes/list-campagnes.component";
import { ListCongeComponent } from "./components/list-conge/list-conge.component";
import { ListSortieComponent } from "./components/list-sortie/list-sortie.component";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { TaxiComponent } from "./components/taxi/taxi.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showSidebar: false }  },
  { path: 'home', component: HomeComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'all-candidats', component: AllCandidatsComponent },
  { path: 'list-conge', component: ListCongeComponent },
  { path: 'add-conge', component: AddCongeComponent },
  { path: 'list-campagnes', component: ListCampagnesComponent },
  { path: 'add-campagne', component: AddCampagneComponent },
  { path: 'add-planning', component: AddPlanningComponent },
  { path: 'autorisation-sortie', component: ListSortieComponent },
  { path: 'taxi', component: TaxiComponent },
  { path: 'map', component: MapComponent , data: { showSidebar: false } },
  { path: 'attestation-travail', component: ListAttestationTravailComponent },
  { path: 'gestion-typologie-canal', component: GestionTypologieCanalComponent },
  { path: 'gestion-sites', component: GestionSiteComponent },
  { path: 'gestion-societes', component: GestionSocieteComponent },
  { path: 'gestion-typologie', component: GestionTypologieComponent },
  { path: 'gestion-pays', component: GestionPaysComponent },
  { path: 'gestion-langues', component: GestionLanguesComponent },
  { path: 'gestion-cibles', component: GestionCiblesComponent },
  { path: 'gestion-type-action', component: GestionTypeActionComponent },
  { path: 'gestion-jours-feries', component: GestionJoursFeriesComponent },
  { path: 'gestion-jour-semaine', component: GestionJoursSemaineComponent },
  { path: 'gestion-planning', component: GestionPlanningComponent },
  { path: 'gestion-heure-depart', component: GestionHeureDepartComponent },
  { path: 'gestion-sexe', component: GestionSexeComponent },
  { path: 'gestion-fonction', component: GestionFonctionComponent },
  { path: 'gestion-type-attestation', component: GestionTypeAttestationComponent },
  { path: 'gestion-type-conge', component: GestionTypeCongeComponent },
  { path: 'gestion-type-contrat', component: GestionTypeContratComponent },
  { path: 'gestion-etat-civil', component: GestionEtatCivilComponent },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
