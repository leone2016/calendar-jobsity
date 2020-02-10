import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {select, Store} from "@ngrx/store";
import {GET_DATE, GET_REMINDERS} from "./store/calendar.selectors";
import { Subject} from "rxjs";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {GetReminder} from "./store/calendar.action";
import {Reminder} from "../reminder/reminder.model";

export interface Calendar {
  month: number;
  day: number;
}
@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit, OnDestroy {
  public now: Moment;
  public month: number;
  public year: number;
  public nameMonth: any;
  public controllerArrows = 0;
  public listMonth: Calendar[] = [];
  public dayStart: number;
  public daysInMonth: number;
  public date: any;
  public _unsubscribe: Subject<void> = new Subject<void>();
  public listReminders: Reminder[] = [];

  color: string;
  displayReminders: boolean = false;
  codeSelected: string = "";
  daysInLastMonth: number;
  constructor(private _store: Store<object>,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit() {
    this.listReminders = [];
    this._store.pipe(
      select(GET_DATE),
      takeUntil(this._unsubscribe)
    ).subscribe((now: Moment)=>{
      this.now = now;
      this.init();
    });

    this._store.pipe(
      select(GET_REMINDERS),
      takeUntil(this._unsubscribe)
    ).subscribe((reminders: Reminder[])=>{
      this.listReminders = reminders;
      this.listReminders.sort((a, b) => (a.dateStart > b.dateStart) ? 1 : -1 )
    });
  }




  private init(): void {
    this.listMonth = [];
    this.month = this.now.month() + 1;
    this.year = this.now.year();
    const labelMonth = `${this.year}-${this.month}-01`;
    this.date = moment(labelMonth, 'YYYY-MM-DD');
    this.nameMonth = moment(labelMonth, 'MMM MMMM');
    this._store.dispatch( new GetReminder(`${this.year}-${this.month}`));
    this.dayStart = this.date.day();
    this.daysInMonth =  this.date.daysInMonth();
    if ( this.dayStart > 1 ) {
      this.daysInLastMonth = moment(`${this.year}-${this.month - 1 }-01`, 'YYYY-MM-DD').daysInMonth();
      this._fillingCalendar(this.daysInLastMonth - (this.dayStart - 2), this.daysInLastMonth, this.month - 1 );
    }
    this._fillingCalendar(1, this.daysInMonth, this.month );
    this._fillingCalendar(1, 35 - this.listMonth.length, this.month +1 );
  }

  private _fillingCalendar(start: number, end: number, month: number) {
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
  public preventPropagation(event: Event): void {
    event.stopPropagation();
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getHour(dateStart: string): Date{
    return moment.unix(Number(dateStart)).toDate()
  }
  showDialog(reminder: Reminder) {
    this.codeSelected = reminder.code;
    this.displayReminders = true;
  }
}
