import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypologieCanalComponent } from './gestion-typologie-canal.component';

describe('GestionTypologieCanalComponent', () => {
  let component: GestionTypologieCanalComponent;
  let fixture: ComponentFixture<GestionTypologieCanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTypologieCanalComponent]
    });
    fixture = TestBed.createComponent(GestionTypologieCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
