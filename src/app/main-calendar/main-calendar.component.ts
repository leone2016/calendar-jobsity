import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

export interface Calendar {
  month: number;
  day: number;
}
@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit {
  now: Moment;
  month: number;
  nameMonth: any;
  controllerArrows = 0;
  listMonth: Calendar[] = [];
  dayStart: number;
  daysInMonth: number;
  date: any;

  daysInLastMonth: number;
  constructor() { }

  ngOnInit() {
    this.now = moment(); // add this 2 of 4
    this.init();
  }

  private init(): void {
    this.listMonth = [];
    this.month = this.now.month() + 1;
    this.date = moment(`2020-${this.month}-01`, 'YYYY-MM-DD');
    this.nameMonth = moment(`2020-${this.month}-01`, 'MMM MMMM');
    this.dayStart = this.date.day();
    this.daysInMonth =  this.date.daysInMonth();
    if ( this.dayStart > 1 ) {
      this.daysInLastMonth = moment(`2020-${this.month - 1 }-01`, 'YYYY-MM-DD').daysInMonth();
      this.fillingCalendar(this.daysInLastMonth - (this.dayStart - 2), this.daysInLastMonth, this.month - 1 );
    }
    this.fillingCalendar(1, this.daysInMonth, this.month );
    console.log(this.listMonth);
  }
  private fillingCalendar(start: number, end: number, month: number) {
    for ( let i = start ; i <= end ; i ++ ) {
      this.listMonth.push( {
        day: i,
        month
      });
    }
  }
  private moreMonths( diff?: number) {
    this.controllerArrows += diff;
    this.now =  moment().add(   this.controllerArrows, 'month');
    this.init();
  }
}
