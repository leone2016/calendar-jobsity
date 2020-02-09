import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reminder} from "./reminder.model";
import * as uuid from 'uuid';
import {Location} from "@angular/common";
import {CalendarService} from "../main-calendar/services/calendar.service";
import * as moment from "moment";
import {Country} from "../main-calendar/model/country.model";
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public countries: Country[] = [];
  public reminderForm: FormGroup;
  constructor(private readonly _fb: FormBuilder,
              private calendarService: CalendarService,
              private _location: Location) { }

  ngOnInit() {
    this.reminderForm = this._fb.group({
        code: [''],
        city: ['', Validators.required],
        isAllDay: [false, Validators.required],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
        description: ['', [Validators.required, Validators.maxLength(30)]],
        color: ['#d7dbef', Validators.required]
    });
    this.calendarService.getCountries().subscribe((res:Country[])=>{
      this.countries = res;
    })
  }
  public backClicked(): void {
    this._location.back();
  }
  public onSubmit(): void {
    const dateStart = new Date(this.reminderForm.controls.dateStart.value);
    const dateEnd = new Date(this.reminderForm.controls.dateEnd.value);
    let reminder = new Reminder({ ...this.reminderForm.value});
    reminder = {
      ...reminder,
      code: uuid.v4(),
      dateStart: dateStart.getTime().toString(),
      dateEnd: dateEnd.getTime().toString(),
      dayCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1)+'-'+dateStart.getDate(),
      monthCalendar: dateStart.getFullYear()+'-'+(dateStart.getMonth()+1),
    }

    this.calendarService.addReminder(reminder);
    console.log( reminder);
  }

}
