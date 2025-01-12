import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttestationTravailComponent } from './list-attestation-travail.component';

describe('ListAttestationTravailComponent', () => {
  let component: ListAttestationTravailComponent;
  let fixture: ComponentFixture<ListAttestationTravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAttestationTravailComponent]
    });
    fixture = TestBed.createComponent(ListAttestationTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
