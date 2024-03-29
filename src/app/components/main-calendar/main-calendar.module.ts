import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainCalendarComponent } from './main-calendar.component';
import {MatButtonModule, MatSnackBarModule} from '@angular/material';
import { PrintDayPipe } from './pipes/print-day.pipe';
import {RouterModule} from "@angular/router";
import {CalendarStoreModule} from "./store/store.module";
import {CalendarService} from "./services/calendar.service";

import {ReminderComponent} from "../reminder/reminder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from 'primeng/colorpicker';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PrintReminderPipe} from "./pipes/print-reminder.pipe";
import {DialogModule} from "primeng/dialog";



@NgModule({
  declarations: [HeaderComponent, MainCalendarComponent, PrintDayPipe,
    ReminderComponent, PrintReminderPipe],
  exports: [
    MainCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CalendarModule,
    RouterModule,
    CalendarStoreModule,
    ColorPickerModule,
    InputTextModule,
    MatButtonModule,
    DialogModule
  ],
  providers: [
    CalendarService
  ]
})
export class MainCalendarModule { }
