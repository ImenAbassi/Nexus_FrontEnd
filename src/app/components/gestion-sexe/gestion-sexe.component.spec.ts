import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSexeComponent } from './gestion-sexe.component';

describe('GestionSexeComponent', () => {
  let component: GestionSexeComponent;
  let fixture: ComponentFixture<GestionSexeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionSexeComponent]
    });
    fixture = TestBed.createComponent(GestionSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
