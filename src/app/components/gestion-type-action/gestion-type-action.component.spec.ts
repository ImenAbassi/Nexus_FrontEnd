import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypeActionComponent } from './gestion-type-action.component';

describe('GestionTypeActionComponent', () => {
  let component: GestionTypeActionComponent;
  let fixture: ComponentFixture<GestionTypeActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypeActionComponent]
    });
    fixture = TestBed.createComponent(GestionTypeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
