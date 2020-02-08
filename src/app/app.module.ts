import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MainCalendarModule} from './components/main-calendar/main-calendar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NGRX
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';



import {environment} from '../environments/environment';
import { ReminderComponent } from './components/reminder/reminder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {APP_ROUTES} from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    ReminderComponent,
  ],
  imports: [
    BrowserModule,
    MainCalendarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
