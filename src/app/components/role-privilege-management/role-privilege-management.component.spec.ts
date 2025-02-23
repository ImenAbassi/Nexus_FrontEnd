import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePrivilegeManagementComponent } from './role-privilege-management.component';

describe('RolePrivilegeManagementComponent', () => {
  let component: RolePrivilegeManagementComponent;
  let fixture: ComponentFixture<RolePrivilegeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolePrivilegeManagementComponent]
    });
    fixture = TestBed.createComponent(RolePrivilegeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
