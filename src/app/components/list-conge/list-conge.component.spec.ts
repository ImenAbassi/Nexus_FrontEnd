import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongeComponent } from './list-conge.component';

describe('ListCongeComponent', () => {
  let component: ListCongeComponent;
  let fixture: ComponentFixture<ListCongeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCongeComponent]
    });
    fixture = TestBed.createComponent(ListCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
