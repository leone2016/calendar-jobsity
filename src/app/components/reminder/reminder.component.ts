import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public reminderForm: FormGroup;
  private _unsubscribe: Subject<void> = new Subject<void>();
  private weather: WeatherModel;
  private labelMonth: string;
  constructor(private readonly _fb: FormBuilder,
              private calendarService: CalendarService,
              private _location: Location,
              private _store: Store<object>,
              private _router: Router,
              private _activeRoute: ActivatedRoute) {
    this.init();
  }

  private init():void {
    this.reminderForm = this._fb.group({
      code: [''],
      city: ['', Validators.required],
      isAllDay: [false, Validators.required],
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
    })
    this._store.select(LOAD_WEATHER).subscribe((weather: WeatherModel)=>{
      try {
        this.weather = weather;
        this.weather.main.temp_min =  this.weather.main.temp_min - 273.15;
        this.weather.main.temp_max =  this.weather.main.temp_max - 273.15;
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
    this.backClicked();
    console.log( reminder);
  }

  public _f(): any{
    return this.reminderForm.controls;
  }
}
