import {Injectable} from "@angular/core";
import {CalendarService} from "../../services/calendar.service";
import {Observable} from "rxjs";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as CalendarActions from "../calendar.action";
import {map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {ICalendarState} from "../reducers";
import {SetReminder} from "../calendar.action";
import {WeatherModel} from "../../model/wwather.model";

@Injectable()
export class CalendarEffects {

  /**
   * get reminders from localStorage
   */
  @Effect()
  public getCountries:Observable<{type: string}> = this.action$.pipe(
    ofType<CalendarActions.GetReminder>(CalendarActions.GET_REMINDER),
    map( (action: CalendarActions.GetReminder )=> {
      const reminders = this.calendarService.getRemindersbyMonth(action.monthSearch);
      if(reminders){
        this._store.dispatch( new SetReminder(reminders));
      }
      return { type: "Reminders Requested"}
    })
  );
  /**
   * get weater from openweatermap.org
   */
  @Effect()
  public getWeather:Observable<CalendarActions.LoadWeather> = this.action$.pipe(
    ofType<CalendarActions.GetWeather>(CalendarActions.GET_WEATHER),
    switchMap( (action: CalendarActions.GetWeather )=>
      this.calendarService.getWeather(action.payload).pipe(
        map(
          (weather: WeatherModel)=>
            new CalendarActions.LoadWeather(weather))
      )
     )
  );


  constructor( public action$: Actions, public calendarService: CalendarService,
               private _store: Store<ICalendarState>) {}
}
