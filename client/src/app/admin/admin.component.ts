import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

import { AppointmentStatus } from '../enums/appointment_status';
import { months } from '../months';
import { Appointment } from '../interfaces/appointment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  appointmentsToday: number = 0;
  appointmentsTomorrow: number = 0;
  appointmentsYesterday: number = 0;
  currentYear: string = new Date().getFullYear().toString();
  currentMonth: number = new Date().getMonth();
  currentMonthFormatted: string = months[this.currentMonth];
  daysInMonth: number = new Date(parseInt(this.currentYear), this.currentMonth + 1, 0).getDate();
  currentDay: number = new Date().getDate();
  currentTime: number = new Date().getHours();

  constructor(public route: ActivatedRoute, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointmentsToday();
    this.getAppointmentsTomorrow();
    this.getAppointmentsYesterday();
  }

  getAppointmentsToday(): void {
    this.appointmentService
      .getAppointmentsByDay(this.currentYear, months[this.currentMonth], this.currentDay.toString())
      .subscribe((res: any) => {
        res.map((appointment: Appointment) => {
          if (appointment.status !== AppointmentStatus.CANCELLED) {
            this.appointmentsToday++;
          }
        });
      });
  }

  getAppointmentsTomorrow(): void {
    let tomorrow = this.currentDay + 1;
    if (tomorrow > this.daysInMonth) {
      tomorrow = 1;
    }

    this.appointmentService
      .getAppointmentsByDay(this.currentYear, months[this.currentMonth + 1], tomorrow.toString())
      .subscribe((res: any) => {
        res.map((appointment: Appointment) => {
          if (appointment.status !== AppointmentStatus.CANCELLED) {
            this.appointmentsTomorrow++;
          }
        });
      });
  }

  getAppointmentsYesterday(): void {
    let yesterday = this.currentDay - 1;
    if (yesterday < 1) {
      yesterday = this.daysInMonth;
    }

    this.appointmentService
      .getAppointmentsByDay(this.currentYear, months[this.currentMonth - 1], yesterday.toString())
      .subscribe((res: any) => {
        res.map((appointment: Appointment) => {
          if (appointment.status !== AppointmentStatus.CANCELLED) {
            this.appointmentsYesterday++;
          }
        });
      });
  }
}
