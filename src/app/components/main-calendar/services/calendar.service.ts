import { Injectable } from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {Reminder} from "../../reminder/reminder.model";
import {environment} from "../../../../environments/environment";
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import {from, Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Country} from "../model/country.model";
import {Store} from "@ngrx/store";
import {ICalendarState} from "../store/reducers";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
public countries: Country[] = [];
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
  public getReminders(): Reminder[] {
    return this._localStorageService.get<Reminder[]>(this._getlocalStorageKey());
  }
  public getRemindersbyMonth(monthSearch: string):Reminder[] {
    try {
      return this._localStorageService.get<Reminder[]>(this._getlocalStorageKey())
        .filter( x => x.dayCalendar === monthSearch ) ;
    }catch (e) {
      catchError( e);
    }

  }
  public getCountries(): Observable<Country[]>{
    return this._http.get(`https://restcountries.eu/rest/v2/all`).pipe(
      map( (resp: Country[])=>{
        return resp;
      }),
      catchError((err: Error)=> throwError(err))
    )
  }

}
