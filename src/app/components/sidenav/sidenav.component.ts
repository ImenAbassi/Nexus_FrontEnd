import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from 'src/app/services/PrivilegeService.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  AllParam : boolean = false;
  validationConge: boolean = false;
  validationAutorisation: boolean = false;
  validationAttestation: boolean = false;
  validationTaxi: boolean = false;
  pointage: boolean = false;
  constructor(private privilegeService: PrivilegeService) {}
  
  ngOnInit(): void {
    this.pointage =this.privilegeService.hasPrivilege(['Validation_Pointage']);
    this.AllParam = this.privilegeService.hasPrivilege('All_Parametrage');
    this.validationConge= this.privilegeService.hasPrivilege(['Validation_Conge_RH', 'Validation_Conge_ChefProjet', 'Validation_Conge_Superviseur']);
    this.validationAutorisation= this.privilegeService.hasPrivilege(['Validation_Autorisation_RH', 'Validation_Autorisation_ChefProjet', 'Validation_Autorisation_Superviseur']);
    this.validationAttestation= this.privilegeService.hasPrivilege(['Validation_Attestation']);
    this.validationTaxi= this.privilegeService.hasPrivilege(['Validation_Transport']);

  }

}
