import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentItemComponent } from './list-appointment-item.component';

describe('ListAppointmentItemComponent', () => {
  let component: ListAppointmentItemComponent;
  let fixture: ComponentFixture<ListAppointmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
