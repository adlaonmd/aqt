import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  appointment_id!: string;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.currentMessage.subscribe((res) => {
      this.appointment_id = res;
    });
  }
}
