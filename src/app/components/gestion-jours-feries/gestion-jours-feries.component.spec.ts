import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJoursFeriesComponent } from './gestion-jours-feries.component';

describe('GestionJoursFeriesComponent', () => {
  let component: GestionJoursFeriesComponent;
  let fixture: ComponentFixture<GestionJoursFeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionJoursFeriesComponent]
    });
    fixture = TestBed.createComponent(GestionJoursFeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
