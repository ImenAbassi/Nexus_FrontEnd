import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAttestationComponent } from './validation-attestation.component';

describe('ValidationAttestationComponent', () => {
  let component: ValidationAttestationComponent;
  let fixture: ComponentFixture<ValidationAttestationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationAttestationComponent]
    });
    fixture = TestBed.createComponent(ValidationAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
