import { Component, OnInit } from '@angular/core';
//import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // url?: string;
  // constructor(private router: Router) {
  //   router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.url = event.url;
  //     }
  //   });
  // }
  // ngOnInit(): void {
  //   this.url = this.router.url;
  // }

  constructor() {}

  ngOnInit(): void {}
}
