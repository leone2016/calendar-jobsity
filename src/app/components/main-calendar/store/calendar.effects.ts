import {Injectable} from "@angular/core";
import {CalendarService} from "../services/calendar.service";
import {Observable} from "rxjs";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as CalendarActions from "./calendar.action";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {ICalendarState} from "./reducers";
import {SetReminder} from "./calendar.action";

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


  constructor( public action$: Actions, public calendarService: CalendarService,
               private _store: Store<ICalendarState>) {}
}
