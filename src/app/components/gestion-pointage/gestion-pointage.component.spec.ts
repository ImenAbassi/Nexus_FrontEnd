import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPointageComponent } from './gestion-pointage.component';

describe('GestionPointageComponent', () => {
  let component: GestionPointageComponent;
  let fixture: ComponentFixture<GestionPointageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPointageComponent]
    });
    fixture = TestBed.createComponent(GestionPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
