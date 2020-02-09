import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reminder} from "./reminder.model";
import * as uuid from 'uuid';
import {Location} from "@angular/common";
import {CalendarService} from "../main-calendar/services/calendar.service";
import {select, Store} from "@ngrx/store";
import {GET_WEATHER, GetWeather} from "../main-calendar/store/calendar.action";
import {GET_REMINDERS, LOAD_WEATHER} from "../main-calendar/store/calendar.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {WeatherModel} from "../main-calendar/model/wwather.model";
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public reminderForm: FormGroup;
  private _unsubscribe: Subject<void> = new Subject<void>();
  private weather: WeatherModel;

  constructor(private readonly _fb: FormBuilder,
              private calendarService: CalendarService,
              private _location: Location,
              private _store: Store<object>) { }

  ngOnInit() {

    this.reminderForm = this._fb.group({
        code: [''],
        city: ['', Validators.required],
        isAllDay: [false, Validators.required],
        dateStart: ['', Validators.required],
      //dateEnd: ['', Validators.required],
        description: ['', [Validators.required, Validators.maxLength(30)]],
        color: ['#d7dbef', Validators.required]
    });
    this._store.select(LOAD_WEATHER).subscribe((weather: WeatherModel)=>{
      // console.log(weather);
      try {
        this.weather = weather;
        this.weather.main.temp_min =  this.weather.main.temp_min - 273.15;
        this.weather.main.temp_max =  this.weather.main.temp_max - 273.15;
      }catch (e) {
      }
      console.log(this.weather)
    });

  }
  public searchWeather():void{
    //if(this.reminderForm.controls.city.value){
    this._store.dispatch( new GetWeather(this.reminderForm.controls.city.value));

    //}
  }
  public backClicked(): void {
    this._location.back();
  }
  public onSubmit(): void {
    const dateStart = new Date(this.reminderForm.controls.dateStart.value);
   /* const dateEnd = new Date(this.reminderForm.controls.dateEnd.value);*/
    let reminder = new Reminder({ ...this.reminderForm.value});
    reminder = {
      ...reminder,
      code: uuid.v4(),
      dateStart: dateStart.getTime().toString(),
      dayCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1)+'-'+dateStart.getDate(),
      monthCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1),
    }

    this.calendarService.addReminder(reminder);
    console.log( reminder);
  }

}
