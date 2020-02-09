import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Actions, Effect} from "@ngrx/effects";
import {CalendarService} from "../../services/calendar.service";

@Injectable()
export class CalendarEffects {

  @Effect()
  public getCountries:Observable<{}>
  constructor( public action$: Actions, public calendarService: CalendarService ) {}
}
