import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentStatus } from 'src/app/enums/appointment_status';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-list-appointment-item',
  templateUrl: './list-appointment-item.component.html',
  styleUrls: ['./list-appointment-item.component.scss'],
})
export class ListAppointmentItemComponent implements OnInit {
  @Input() appointment!: Appointment;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  cancelAppointment(): void {
    this.appointmentService.cancelAppointment(this.appointment).subscribe(
      (res) => {
        this.appointment.status = AppointmentStatus.CANCELLED;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  acceptAppointment(): void {
    this.appointmentService.arrivedAppointment(this.appointment).subscribe(
      (res) => {
        this.appointment.status = AppointmentStatus.ARRIVED;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
