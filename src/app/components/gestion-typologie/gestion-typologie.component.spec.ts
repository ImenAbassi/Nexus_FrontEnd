import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypologieComponent } from './gestion-typologie.component';

describe('GestionTypologieComponent', () => {
  let component: GestionTypologieComponent;
  let fixture: ComponentFixture<GestionTypologieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypologieComponent]
    });
    fixture = TestBed.createComponent(GestionTypologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
