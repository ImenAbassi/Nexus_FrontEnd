import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLanguesComponent } from './gestion-langues.component';

describe('GestionLanguesComponent', () => {
  let component: GestionLanguesComponent;
  let fixture: ComponentFixture<GestionLanguesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionLanguesComponent]
    });
    fixture = TestBed.createComponent(GestionLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
