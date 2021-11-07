import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  currentTab?: string;

  constructor() {}

  ngOnInit(): void {}

  viewTab(tab: string) {
    this.currentTab = tab;
    console.log(this.currentTab);
  }
}
