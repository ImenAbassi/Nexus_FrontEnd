import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypePointageComponent } from './gestion-type-pointage.component';

describe('GestionTypePointageComponent', () => {
  let component: GestionTypePointageComponent;
  let fixture: ComponentFixture<GestionTypePointageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypePointageComponent]
    });
    fixture = TestBed.createComponent(GestionTypePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
