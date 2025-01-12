import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampagnesComponent } from './list-campagnes.component';

describe('ListCampagnesComponent', () => {
  let component: ListCampagnesComponent;
  let fixture: ComponentFixture<ListCampagnesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCampagnesComponent]
    });
    fixture = TestBed.createComponent(ListCampagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
