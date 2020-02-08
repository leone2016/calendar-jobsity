import {ActionReducerMap, createFeatureSelector, MemoizedSelector} from "@ngrx/store";
import {calendarReducer, ICalendarState} from "./calendar.reducer";

export interface ICalendarAppState {
  calendar: ICalendarState;
}

export const GET_CALENDAR_APP_STATE: MemoizedSelector<
  object,ICalendarAppState> = createFeatureSelector<ICalendarAppState>('calendar-app');

export const CALENDAR_REDUCER: ActionReducerMap<ICalendarAppState> = {
  calendar: calendarReducer
};
export * from './calendar.reducer';
