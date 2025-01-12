import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCandidatsComponent } from './all-candidats.component';

describe('AllCandidatsComponent', () => {
  let component: AllCandidatsComponent;
  let fixture: ComponentFixture<AllCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCandidatsComponent]
    });
    fixture = TestBed.createComponent(AllCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
