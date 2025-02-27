import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPointageComponent } from './validation-pointage.component';

describe('ValidationPointageComponent', () => {
  let component: ValidationPointageComponent;
  let fixture: ComponentFixture<ValidationPointageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationPointageComponent]
    });
    fixture = TestBed.createComponent(ValidationPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
