import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reminder} from "./reminder.model";
import * as uuid from 'uuid';
import {Location} from "@angular/common";
import {CalendarService} from "../main-calendar/services/calendar.service";
import { Store} from "@ngrx/store";
import {EnableLoadingAction, GetWeather} from "../main-calendar/store/calendar.action";
import { LOAD_WEATHER} from "../main-calendar/store/calendar.selectors";
import {Subject, Subscription} from "rxjs";
import {WeatherModel} from "../main-calendar/model/wwather.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit, OnDestroy {
  @Input() public code: string;

  public reminderForm: FormGroup;
  public _unsubscribe: Subscription = new Subscription() ;
  public weather: WeatherModel;
  public labelMonth: string;
  public loadReminder: Reminder;
  constructor(private readonly _fb: FormBuilder,
              private calendarService: CalendarService,
              private _location: Location,
              private _store: Store<object>,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,) {
    this.init();
  }

  private init():void {
    this.reminderForm = this._fb.group({
      code: [''],
      city: ['', Validators.required],
      dateStart: [new Date(), Validators.required],
      description: ['', [Validators.required, Validators.maxLength(30)]],
      color: ['#d7dbef', Validators.required]
    });

  }
  ngOnInit() {
    this._activeRoute.params.subscribe(params =>{
      this.labelMonth = params['labelMonth'];
      this.reminderForm.patchValue({
        dateStart: new Date(this.labelMonth)
      });
    });
    if( this.code !== undefined ){
      this.loadReminder = this.calendarService.getRemindersbyCode(this.code);
      this.reminderForm.patchValue({
        code: this.loadReminder.code,
        city: this.loadReminder.city,
        description: this.loadReminder.description,
        color: this.loadReminder.color,
        dateStart: moment.unix(Number(this.loadReminder.dateStart)).toDate()
      });
      this.searchWeather();
    }
    this._unsubscribe = this._store.select(LOAD_WEATHER).subscribe((weather: WeatherModel)=>{
      try {
        if(this.reminderForm.controls.city.value){
          this.weather = weather;
          this.weather.main.temp_min =  this.weather.main.temp_min - 273.15;
          this.weather.main.temp_max =  this.weather.main.temp_max - 273.15;
        }
      }catch (e) {
        console.log(e);
      }
    });

  }
  public searchWeather():void{
    if(this.reminderForm.controls.city.value){
      this._store.dispatch( new GetWeather(this.reminderForm.controls.city.value));
    }
  }
  public backClicked(): void {
    this._router.navigate(['/',this.labelMonth]);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  public onSubmit(): void {
    const dateStart = new Date(this.reminderForm.controls.dateStart.value);
    let reminder = new Reminder({ ...this.reminderForm.value});
    let localTime  = moment(dateStart.toString()).toDate();
    let test  = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    reminder = {
      ...reminder,
      code: this.code === undefined? uuid.v4(): this.code,
      dateStart: moment(test).format("X"),
      dayCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1)+'-'+dateStart.getDate(),
      monthCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1),
    }
    if( this.code !== undefined){
      this.calendarService.editReminder(reminder);
      this._store.dispatch( new  EnableLoadingAction());
     this.openSnackBar('Reminder Updated', 'X');
    }else{
      this.calendarService.addReminder(reminder);
      this.backClicked();
    }
  }

  public _f(): any{
    return this.reminderForm.controls;
  }

  ngOnDestroy(): void {
    this._unsubscribe.unsubscribe()
  }
}
