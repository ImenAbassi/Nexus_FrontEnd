import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFonctionComponent } from './gestion-fonction.component';

describe('GestionFonctionComponent', () => {
  let component: GestionFonctionComponent;
  let fixture: ComponentFixture<GestionFonctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFonctionComponent]
    });
    fixture = TestBed.createComponent(GestionFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
