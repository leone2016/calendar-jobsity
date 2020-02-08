import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Store} from "@ngrx/store";
import {GET_DATE} from "./store/calendar.selectors";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material";

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
  private now$: Observable<Moment>;
  private now: Moment;
  private month: number;
  private year: number;
  private nameMonth: any;
  private controllerArrows = 0;
  private listMonth: Calendar[] = [];
  private dayStart: number;
  private daysInMonth: number;
  private date: any;

  daysInLastMonth: number;
  constructor(private _store: Store<object>,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.openSnackBar('Welcome', 'x')
    this.now$ = this._store.select(GET_DATE);
    this.now$.subscribe((now: Moment)=>{
      console.log(now);
      this.now = now;
      this.init();
    })
  }

  private init(): void {
    this.listMonth = [];
    this.month = this.now.month() + 1;
    this.year = this.now.year();
    this.date = moment(`${this.year}-${this.month}-01`, 'YYYY-MM-DD');
    this.nameMonth = moment(`${this.year}-${this.month}-01`, 'MMM MMMM');
    this.dayStart = this.date.day();
    this.daysInMonth =  this.date.daysInMonth();
    if ( this.dayStart > 1 ) {
      this.daysInLastMonth = moment(`2020-${this.month - 1 }-01`, 'YYYY-MM-DD').daysInMonth();
      this.fillingCalendar(this.daysInLastMonth - (this.dayStart - 2), this.daysInLastMonth, this.month - 1 );
    }
    this.fillingCalendar(1, this.daysInMonth, this.month );
  }
  private fillingCalendar(start: number, end: number, month: number) {
    for ( let i = start ; i <= end ; i ++ ) {
      this.listMonth.push( {
        day: i,
        month
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
