import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainCalendarComponent } from './main-calendar.component';
import {MatSnackBarModule} from '@angular/material';
import { PrintDayPipe } from './pipes/print-day.pipe';
import {RouterModule} from "@angular/router";
import {CalendarStoreModule} from "./store/store.module";



@NgModule({
  declarations: [HeaderComponent, SideBarComponent, MainCalendarComponent, PrintDayPipe],
  exports: [
    MainCalendarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule,
    CalendarStoreModule
  ]
})
export class MainCalendarModule { }
