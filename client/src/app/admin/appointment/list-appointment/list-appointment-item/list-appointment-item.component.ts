import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentStatus } from 'src/app/enums/appointment_status';

@Component({
  selector: 'app-list-appointment-item',
  templateUrl: './list-appointment-item.component.html',
  styleUrls: ['./list-appointment-item.component.scss'],
})
export class ListAppointmentItemComponent implements OnInit {
  @Input() appointment!: Appointment;

  constructor() {}

  ngOnInit(): void {}

  cancelAppointment(): void {
    console.log(`Cancelling appointment ID: ${this.appointment.appointment_id}`);
    this.appointment.status = AppointmentStatus.CANCELLED;
  }

  acceptAppointment(): void {
    console.log(`Accepting appointment ID: ${this.appointment.appointment_id}`);
    this.appointment.status = AppointmentStatus.ARRIVED;
  }
}
