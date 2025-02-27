import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTaxiComponent } from './validation-taxi.component';

describe('ValidationTaxiComponent', () => {
  let component: ValidationTaxiComponent;
  let fixture: ComponentFixture<ValidationTaxiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationTaxiComponent]
    });
    fixture = TestBed.createComponent(ValidationTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
