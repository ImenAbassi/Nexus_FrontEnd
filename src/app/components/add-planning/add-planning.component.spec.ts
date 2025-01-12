import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanningComponent } from './add-planning.component';

describe('AddPlanningComponent', () => {
  let component: AddPlanningComponent;
  let fixture: ComponentFixture<AddPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlanningComponent]
    });
    fixture = TestBed.createComponent(AddPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
