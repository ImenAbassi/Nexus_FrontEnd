import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtatCivilComponent } from './gestion-etat-civil.component';

describe('GestionEtatCivilComponent', () => {
  let component: GestionEtatCivilComponent;
  let fixture: ComponentFixture<GestionEtatCivilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEtatCivilComponent]
    });
    fixture = TestBed.createComponent(GestionEtatCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
