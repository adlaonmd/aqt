import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  message!: string;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.currentMessage.subscribe((res) => {
      this.message = res;
    });
  }
}
