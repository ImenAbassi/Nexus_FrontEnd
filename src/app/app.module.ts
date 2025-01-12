import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddCampagneComponent } from "./components/add-campagne/add-campagne.component";
import { AddCongeComponent } from "./components/add-conge/add-conge.component";
import { AddPlanningComponent } from "./components/add-planning/add-planning.component";
import { AllCandidatsComponent } from "./components/all-candidats/all-candidats.component";
import { AllUsersComponent } from "./components/all-users/all-users.component";
import { FooterComponent } from "./components/footer/footer.component";
import { GestionSiteComponent } from './components/gestion-site/gestion-site.component';
import { GestionSocieteComponent } from './components/gestion-societes/gestion-societes.component';
import { GestionTypologieCanalComponent } from './components/gestion-typologie-canal/gestion-typologie-canal.component';
import { HomeComponent } from "./components/home/home.component";
import { ListAttestationTravailComponent } from './components/list-attestation-travail/list-attestation-travail.component';
import { ListCampagnesComponent } from "./components/list-campagnes/list-campagnes.component";
import { ListCongeComponent } from "./components/list-conge/list-conge.component";
import { ListSortieComponent } from "./components/list-sortie/list-sortie.component";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { TaxiComponent } from "./components/taxi/taxi.component";
import { TestComponent } from "./components/test/test.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { GestionTypologieComponent } from './components/gestion-typologie/gestion-typologie.component';
import { GestionPaysComponent } from './components/gestion-pays/gestion-pays.component';
import { GestionLanguesComponent } from './components/gestion-langues/gestion-langues.component';
import { GestionCiblesComponent } from './components/gestion-cibles/gestion-cibles.component';
import { GestionTypeActionComponent } from './components/gestion-type-action/gestion-type-action.component';
import { GestionJoursFeriesComponent } from './components/gestion-jours-feries/gestion-jours-feries.component';
import { GestionJoursSemaineComponent } from './components/gestion-jours-semaine/gestion-jours-semaine.component';
import { GestionPlanningComponent } from './components/gestion-planning/gestion-planning.component';
import { GestionHeureDepartComponent } from './components/gestion-heure-depart/gestion-heure-depart.component';
import { GestionSexeComponent } from './components/gestion-sexe/gestion-sexe.component';
import { GestionFonctionComponent } from './components/gestion-fonction/gestion-fonction.component';
import { GestionTypeAttestationComponent } from './components/gestion-type-attestation/gestion-type-attestation.component';
import { GestionTypeCongeComponent } from './components/gestion-type-conge/gestion-type-conge.component';
import { GestionTypeContratComponent } from './components/gestion-type-contrat/gestion-type-contrat.component';
import { GestionEtatCivilComponent } from './components/gestion-etat-civil/gestion-etat-civil.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SidenavComponent,
    AllUsersComponent,
    NavbarComponent,
    UpdateUserComponent, AllCandidatsComponent, AddCongeComponent, ListCongeComponent,
    ListCampagnesComponent, AddCampagneComponent, AddPlanningComponent, TestComponent,
    ListSortieComponent, TaxiComponent, MapComponent, ListAttestationTravailComponent,
    GestionTypologieCanalComponent, GestionSiteComponent,
    GestionSocieteComponent,
    GestionTypologieComponent,
    GestionPaysComponent,
    GestionLanguesComponent,
    GestionCiblesComponent,
    GestionTypeActionComponent,
    GestionJoursFeriesComponent,
    GestionJoursSemaineComponent,
    GestionPlanningComponent,
    GestionHeureDepartComponent,
    GestionSexeComponent,
    GestionFonctionComponent,
    GestionTypeAttestationComponent,
    GestionTypeCongeComponent,
    GestionTypeContratComponent,
    GestionEtatCivilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
