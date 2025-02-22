import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPrivilegeComponent } from './gestion-privilege.component';

describe('GestionPrivilegeComponent', () => {
  let component: GestionPrivilegeComponent;
  let fixture: ComponentFixture<GestionPrivilegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPrivilegeComponent]
    });
    fixture = TestBed.createComponent(GestionPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
