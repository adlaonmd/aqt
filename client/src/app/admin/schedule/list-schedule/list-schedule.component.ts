import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss'],
})
export class ListScheduleComponent implements OnInit {
  scheduleList: any;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.currentScheduleList.subscribe((res) => {
      this.scheduleList = res;
    });
  }
}
