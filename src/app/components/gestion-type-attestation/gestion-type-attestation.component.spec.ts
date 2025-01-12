import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypeAttestationComponent } from './gestion-type-attestation.component';

describe('GestionTypeAttestationComponent', () => {
  let component: GestionTypeAttestationComponent;
  let fixture: ComponentFixture<GestionTypeAttestationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypeAttestationComponent]
    });
    fixture = TestBed.createComponent(GestionTypeAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
