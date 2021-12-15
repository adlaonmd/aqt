import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentStatus } from 'src/app/enums/appointment_status';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss'],
})
export class ListAppointmentComponent implements OnInit {
  appointmentList: any;
  totalAppointments!: number;
  waitingAppointments!: number;
  arrivedAppointments!: number;
  cancelledAppointments!: number;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.currentAppointmentList.subscribe((res: any) => {
      this.appointmentList = res;

      this.getNumberOfAppointments();
    });
  }

  getNumberOfAppointments(): void {
    this.totalAppointments = this.appointmentList.length;
    this.waitingAppointments = 0;
    this.arrivedAppointments = 0;
    this.cancelledAppointments = 0;

    for (let i = 0; i < this.totalAppointments; i++) {
      if (this.appointmentList[i].status === AppointmentStatus.WAITING) {
        this.waitingAppointments++;
      } else if (this.appointmentList[i].status === AppointmentStatus.ARRIVED) {
        this.arrivedAppointments++;
      } else if (this.appointmentList[i].status === AppointmentStatus.CANCELLED) {
        this.cancelledAppointments++;
      }
    }
  }
}
