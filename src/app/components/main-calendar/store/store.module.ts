import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {CALENDAR_REDUCER} from "./reducers";
import {EffectsModule} from "@ngrx/effects";
import {Calendar_Effects} from "./effects";

/**
 * Store Module - Calendar
 */
@NgModule({
  imports:[
    StoreModule.forFeature('calendar-app', CALENDAR_REDUCER),
    EffectsModule.forRoot(Calendar_Effects)
  ]
})
export class CalendarStoreModule {}
