import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {CALENDAR_REDUCER} from "./reducers";

/**
 * Store Module - Calendar
 */
@NgModule({
  imports:[
    StoreModule.forFeature('calendar-app', CALENDAR_REDUCER),
    // effects here
  ]
})
export class CalendarStoreModule {}
