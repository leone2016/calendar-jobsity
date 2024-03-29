import {createSelector, MemoizedSelector} from "@ngrx/store";
import {ICalendarState} from "./reducers/calendar.reducer";
import {GET_CALENDAR_APP_STATE, ICalendarAppState} from "./reducers";
import {Moment} from "moment";
import {Reminder} from "../../reminder/reminder.model";
import {WeatherModel} from "../model/wwather.model";

/**
 * Calendar Selector
 */
export  const GET_CALENDAR_STATE: MemoizedSelector<
  object,
  ICalendarState
  > = createSelector(
  GET_CALENDAR_APP_STATE,
  (state: ICalendarAppState) => state.calendar
);


export const GET_DATE: MemoizedSelector<object, Moment> = createSelector(
  GET_CALENDAR_STATE,
  (calendarState: ICalendarState)=> calendarState.now
);

export const GET_REMINDERS: MemoizedSelector<object, Reminder[]> = createSelector(
  GET_CALENDAR_STATE,
  (calendarState: ICalendarState)=> calendarState.reminder
);

export const LOAD_WEATHER: MemoizedSelector<object, WeatherModel> = createSelector(
  GET_CALENDAR_STATE,
  (calendarState: ICalendarState)=> calendarState.weather
);
export const ENABLE_LOADING: MemoizedSelector<object, boolean> = createSelector(
  GET_CALENDAR_STATE,
  (calendarState: ICalendarState)=> calendarState.isLoading
);
export const DISABLE_LOADING: MemoizedSelector<object, boolean> = createSelector(
  GET_CALENDAR_STATE,
  (calendarState: ICalendarState)=> calendarState.isLoading
);
