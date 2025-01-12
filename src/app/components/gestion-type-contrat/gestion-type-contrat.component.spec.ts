import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypeContratComponent } from './gestion-type-contrat.component';

describe('GestionTypeContratComponent', () => {
  let component: GestionTypeContratComponent;
  let fixture: ComponentFixture<GestionTypeContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypeContratComponent]
    });
    fixture = TestBed.createComponent(GestionTypeContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
