import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPaysComponent } from './gestion-pays.component';

describe('GestionPaysComponent', () => {
  let component: GestionPaysComponent;
  let fixture: ComponentFixture<GestionPaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPaysComponent]
    });
    fixture = TestBed.createComponent(GestionPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
