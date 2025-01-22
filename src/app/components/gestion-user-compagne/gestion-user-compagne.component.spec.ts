import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUserCompagneComponent } from './gestion-user-compagne.component';

describe('GestionUserCompagneComponent', () => {
  let component: GestionUserCompagneComponent;
  let fixture: ComponentFixture<GestionUserCompagneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionUserCompagneComponent]
    });
    fixture = TestBed.createComponent(GestionUserCompagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
