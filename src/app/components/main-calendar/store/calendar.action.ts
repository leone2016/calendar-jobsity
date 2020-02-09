/**
 * Calendar Actions
 */
import {Action} from '@ngrx/store';
import {Moment} from 'moment';
import {Reminder} from "../../reminder/reminder.model";

export const ENABLE_LOADING = '[CALENDAR] Loading . . . ';
export const DISABLE_LOADING = '[CALENDAR] End Loading . . . ';
export const SET_DATE = '[CALENDAR] Set date Moment';
export const GET_REMINDER = '[CALENDAR] Get reminder';
export const SET_REMINDER = '[CALENDAR] Set reminder';
export const GET_COUNTRIES = '[CALENDAR] Get contries';


export class EnableLoadingAction implements Action {
  readonly type = ENABLE_LOADING;
}

export class DisableLoadingAction implements Action {
  readonly type = DISABLE_LOADING;
}

export class SetDate implements Action {
  readonly type = SET_DATE;
  public now: Moment;
  constructor(  now: Moment) {
    this.now = now;
  }
}

/**
 * Get reminder
 */
export class GetReminder implements Action {
  public readonly type = GET_REMINDER;
  public monthSearch: string
  constructor( monthSearch: string) {
    this.monthSearch = monthSearch;
  }
}

/**
 * Set Reminder
 */
export class SetReminder implements Action {
  readonly type = SET_REMINDER;
  public payload: Reminder[];
  constructor( payload: Reminder[]) {
    this.payload = payload;
  }
}

// export class GetCountries implements Action {
//   public readonly type: string = GET_COUNTRIES;
// }
export type CalendarActions =
  EnableLoadingAction |
  DisableLoadingAction |
  GetReminder |
  SetReminder |
  SetDate;
