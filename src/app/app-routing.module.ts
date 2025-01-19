import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importez vos composants
import { AddCampagneComponent } from './components/add-campagne/add-campagne.component';
import { AddCongeComponent } from './components/add-conge/add-conge.component';
import { AddPlanningComponent } from './components/add-planning/add-planning.component';
import { AllCandidatsComponent } from './components/all-candidats/all-candidats.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { GestionCiblesComponent } from './components/gestion-cibles/gestion-cibles.component';
import { GestionEtatCivilComponent } from './components/gestion-etat-civil/gestion-etat-civil.component';
import { GestionFonctionComponent } from './components/gestion-fonction/gestion-fonction.component';
import { GestionHeureDepartComponent } from './components/gestion-heure-depart/gestion-heure-depart.component';
import { GestionJoursFeriesComponent } from './components/gestion-jours-feries/gestion-jours-feries.component';
import { GestionJoursSemaineComponent } from './components/gestion-jours-semaine/gestion-jours-semaine.component';
import { GestionLanguesComponent } from './components/gestion-langues/gestion-langues.component';
import { GestionPaysComponent } from './components/gestion-pays/gestion-pays.component';
import { GestionPlanningComponent } from './components/gestion-planning/gestion-planning.component';
import { GestionSexeComponent } from './components/gestion-sexe/gestion-sexe.component';
import { GestionSiteComponent } from './components/gestion-site/gestion-site.component';
import { GestionSocieteComponent } from './components/gestion-societes/gestion-societes.component';
import { GestionTypeActionComponent } from './components/gestion-type-action/gestion-type-action.component';
import { GestionTypeAttestationComponent } from './components/gestion-type-attestation/gestion-type-attestation.component';
import { GestionTypeCongeComponent } from './components/gestion-type-conge/gestion-type-conge.component';
import { GestionTypeContratComponent } from './components/gestion-type-contrat/gestion-type-contrat.component';
import { GestionTypologieCanalComponent } from './components/gestion-typologie-canal/gestion-typologie-canal.component';
import { GestionTypologieComponent } from './components/gestion-typologie/gestion-typologie.component';
import { HomeComponent } from './components/home/home.component';
import { ListAttestationTravailComponent } from './components/list-attestation-travail/list-attestation-travail.component';
import { ListCampagnesComponent } from './components/list-campagnes/list-campagnes.component';
import { ListCongeComponent } from './components/list-conge/list-conge.component';
import { ListSortieComponent } from './components/list-sortie/list-sortie.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { TaxiComponent } from './components/taxi/taxi.component';
import { AuthGuard } from './services/auth.guard';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers /login par défaut
  { path: 'login', component: LoginComponent, data: { showSidebar: false } }, // Route publique
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protégée par AuthGuard
  { path: 'all-users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: 'all-candidats', component: AllCandidatsComponent, canActivate: [AuthGuard] },
  { path: 'list-conge', component: ListCongeComponent, canActivate: [AuthGuard] },
  { path: 'add-conge', component: AddCongeComponent, canActivate: [AuthGuard] },
  { path: 'list-campagnes', component: ListCampagnesComponent, canActivate: [AuthGuard] },
  { path: 'add-campagne', component: AddCampagneComponent, canActivate: [AuthGuard] },
  { path: 'add-planning', component: AddPlanningComponent, canActivate: [AuthGuard] },
  { path: 'autorisation-sortie', component: ListSortieComponent, canActivate: [AuthGuard] },
  { path: 'taxi', component: TaxiComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, data: { showSidebar: false }, canActivate: [AuthGuard] },
  { path: 'attestation-travail', component: ListAttestationTravailComponent, canActivate: [AuthGuard] },
  { path: 'gestion-typologie-canal', component: GestionTypologieCanalComponent, canActivate: [AuthGuard] },
  { path: 'gestion-sites', component: GestionSiteComponent, canActivate: [AuthGuard] },
  { path: 'gestion-societes', component: GestionSocieteComponent, canActivate: [AuthGuard] },
  { path: 'gestion-typologie', component: GestionTypologieComponent, canActivate: [AuthGuard] },
  { path: 'gestion-pays', component: GestionPaysComponent, canActivate: [AuthGuard] },
  { path: 'gestion-langues', component: GestionLanguesComponent, canActivate: [AuthGuard] },
  { path: 'gestion-cibles', component: GestionCiblesComponent, canActivate: [AuthGuard] },
  { path: 'gestion-type-action', component: GestionTypeActionComponent, canActivate: [AuthGuard] },
  { path: 'gestion-jours-feries', component: GestionJoursFeriesComponent, canActivate: [AuthGuard] },
  { path: 'gestion-jour-semaine', component: GestionJoursSemaineComponent, canActivate: [AuthGuard] },
  { path: 'gestion-planning', component: GestionPlanningComponent, canActivate: [AuthGuard] },
  { path: 'gestion-heure-depart', component: GestionHeureDepartComponent, canActivate: [AuthGuard] },
  { path: 'gestion-sexe', component: GestionSexeComponent, canActivate: [AuthGuard] },
  { path: 'gestion-fonction', component: GestionFonctionComponent, canActivate: [AuthGuard] },
  { path: 'gestion-type-attestation', component: GestionTypeAttestationComponent, canActivate: [AuthGuard] },
  { path: 'gestion-type-conge', component: GestionTypeCongeComponent, canActivate: [AuthGuard] },
  { path: 'gestion-type-contrat', component: GestionTypeContratComponent, canActivate: [AuthGuard] },
  { path: 'gestion-etat-civil', component: GestionEtatCivilComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }