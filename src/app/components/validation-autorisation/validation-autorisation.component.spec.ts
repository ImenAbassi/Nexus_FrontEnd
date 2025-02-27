import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAutorisationComponent } from './validation-autorisation.component';

describe('ValidationAutorisationComponent', () => {
  let component: ValidationAutorisationComponent;
  let fixture: ComponentFixture<ValidationAutorisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationAutorisationComponent]
    });
    fixture = TestBed.createComponent(ValidationAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
