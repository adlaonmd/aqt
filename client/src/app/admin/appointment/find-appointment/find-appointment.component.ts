import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-find-appointment',
  templateUrl: './find-appointment.component.html',
  styleUrls: ['./find-appointment.component.scss', '../appointment.component.scss'],
})
export class FindAppointmentComponent implements OnInit {
  findAppointmentForm!: FormGroup;
  findAppointment: Boolean = false;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.findAppointmentForm = this.fb.group({
      appointment_id: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    this.appointmentService
      .getAppointment(this.findAppointmentForm.value.appointment_id.toUpperCase())
      .subscribe(
        (res) => {
          this.appointmentService.setAppointmentList([res]);
        },
        (err) => {
          this.appointmentService.setAppointmentList([]);
        }
      )
      .add(() => {
        this.findAppointment = true;
      });
  }
}
