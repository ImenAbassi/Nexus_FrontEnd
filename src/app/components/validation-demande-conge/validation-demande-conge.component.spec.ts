import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemandeCongeComponent } from './validation-demande-conge.component';

describe('ValidationDemandeCongeComponent', () => {
  let component: ValidationDemandeCongeComponent;
  let fixture: ComponentFixture<ValidationDemandeCongeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationDemandeCongeComponent]
    });
    fixture = TestBed.createComponent(ValidationDemandeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
