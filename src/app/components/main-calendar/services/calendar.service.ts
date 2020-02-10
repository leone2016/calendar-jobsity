import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {Reminder} from '../../reminder/reminder.model';
import {environment} from '../../../../environments/environment';
import {isNullOrUndefined} from 'util';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ICalendarState} from '../store/reducers';
import {WeatherModel} from '../model/wwather.model';
import {GetReminder} from "../store/calendar.action";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor( private _localStorageService: LocalStorageService,
               private _http: HttpClient,
               private _store: Store<ICalendarState>) { }

  private _getlocalStorageKey(): string {
    return environment.lclStgReminders
  }
  public addReminder(reminder: Reminder): boolean {
    let reminders: Reminder[] =[];
    if(!isNullOrUndefined(this.getReminders())){
      reminders = this.getReminders();
    }
    reminders.push(reminder);
    return this._localStorageService.set(this._getlocalStorageKey(), reminders);
  }
  public editReminder(reminder: Reminder): void {
    let reminders: Reminder[] =[];
    if(!isNullOrUndefined(this.getReminders())){
      reminders = this.getReminders();
    }
    let index = reminders.findIndex( x=> x.code === reminder.code);
    reminders[index] = reminder;
    this._localStorageService.set(this._getlocalStorageKey(), reminders);
    this._store.dispatch( new GetReminder(`${reminder.monthCalendar}`));
  }
  public getReminders(): Reminder[] {
    return this._localStorageService.get<Reminder[]>(this._getlocalStorageKey());
  }
  public getRemindersbyMonth(monthSearch: string):Reminder[] {
    try {
      return this._localStorageService.get<Reminder[]>(this._getlocalStorageKey())
        .filter( x => x.monthCalendar === monthSearch ) ;
    }catch (e) {
      catchError( e);
    }

  }
  public getRemindersbyCode(code: string):Reminder {
    try {
      return this._localStorageService.get<Reminder[]>(this._getlocalStorageKey())
        .find( x => x.code === code ) ;
    }catch (e) {
      catchError( e);
    }

  }
  public getWeather(city: string): Observable<WeatherModel>{
    return this._http.get(`${environment.apiOpenWeatherMap}?q=${city}&appid=${environment.openweatherKey}`).pipe(
      map( (resp: WeatherModel)=>{
        return resp;
      }),
      catchError((err: Error)=> throwError(err))
    )
  }

}
