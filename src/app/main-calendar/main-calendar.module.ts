import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MainCalendarComponent } from './main-calendar.component';
import {MatCardModule, MatGridListModule, MatSliderModule} from '@angular/material';



@NgModule({
  declarations: [HeaderComponent, SideBarComponent, MainCalendarComponent],
  exports: [
    MainCalendarComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class MainCalendarModule { }
