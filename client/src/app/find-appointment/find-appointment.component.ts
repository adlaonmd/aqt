import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';

import { Appointment } from '../interfaces/appointment';
import { AppointmentStatus } from '../enums/appointment_status';

@Component({
  selector: 'app-find-appointment',
  templateUrl: './find-appointment.component.html',
  styleUrls: ['./find-appointment.component.scss'],
})
export class FindAppointmentComponent implements OnInit {
  findAppointmentForm!: FormGroup;
  findAppointment: boolean = false;
  appointment!: any;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.findAppointmentForm = this.fb.group({
      appointment_id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  handleSubmit(): void {
    this.appointmentService
      .getAppointment(this.findAppointmentForm.value.appointment_id.toUpperCase())
      .subscribe((res: any) => {
        if (res.length === 0) {
          this.appointment = [];
        } else {
          this.appointment = res[0];
        }

        this.findAppointment = true;
      });
  }

  cancelAppointment(): void {
    if (confirm('Are you sure you want to cancel your appointment?')) {
      this.appointmentService.cancelAppointment(this.appointment).subscribe(
        (res) => {
          this.appointment.status = AppointmentStatus.CANCELLED;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
