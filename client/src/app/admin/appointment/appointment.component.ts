import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  currentTab?: string;

  constructor() {}

  ngOnInit(): void {}

  viewTab(tab: string) {
    this.currentTab = tab;
  }
}
