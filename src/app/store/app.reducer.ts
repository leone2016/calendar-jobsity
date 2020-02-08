import * as calendarReducer from '../components/main-calendar/store/reducers/calendar.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  calendar: calendarReducer.ICalendarState;
}

export const appReducers: ActionReducerMap<AppState> = {
  calendar: calendarReducer.calendarReducer
}
