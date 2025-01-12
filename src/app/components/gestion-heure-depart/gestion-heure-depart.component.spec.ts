import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHeureDepartComponent } from './gestion-heure-depart.component';

describe('GestionHeureDepartComponent', () => {
  let component: GestionHeureDepartComponent;
  let fixture: ComponentFixture<GestionHeureDepartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionHeureDepartComponent]
    });
    fixture = TestBed.createComponent(GestionHeureDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
