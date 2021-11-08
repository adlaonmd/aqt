import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  appointment_id!: string;

  constructor(private appointmentService: AppointmentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.appointmentService.currentMessage.subscribe((res) => {
      this.appointment_id = res;
    });
  }

  cancelAppointment(): void {
    this.appointmentService.deleteAppointment(this.appointment_id).subscribe(
      (res) => {
        this.appointmentService.setSubmittedStatus(true);
        this.router.navigate(['../cancel'], { relativeTo: this.route });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
