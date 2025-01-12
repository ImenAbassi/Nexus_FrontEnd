import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJoursSemaineComponent } from './gestion-jours-semaine.component';

describe('GestionJoursSemaineComponent', () => {
  let component: GestionJoursSemaineComponent;
  let fixture: ComponentFixture<GestionJoursSemaineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionJoursSemaineComponent]
    });
    fixture = TestBed.createComponent(GestionJoursSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
