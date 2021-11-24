import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAppointmentComponent } from './find-appointment.component';

describe('FindAppointmentComponent', () => {
  let component: FindAppointmentComponent;
  let fixture: ComponentFixture<FindAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
