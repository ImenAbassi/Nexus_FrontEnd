import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCandidatsComponent } from './gestion-candidats.component';

describe('GestionCandidatsComponent', () => {
  let component: GestionCandidatsComponent;
  let fixture: ComponentFixture<GestionCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCandidatsComponent]
    });
    fixture = TestBed.createComponent(GestionCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
