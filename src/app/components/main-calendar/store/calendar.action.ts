/**
 * Calendar Actions
 */
import {Action} from '@ngrx/store';
import {Moment} from 'moment';

export const ENABLE_LOADING = '[CALENDAR] Loading . . . ';
export const DISABLE_LOADING = '[CALENDAR] End Loading . . . ';
export const SET_DATE = '[CALENDAR] Set date Moment';


export class EnableLoadingAction implements Action {
  readonly type = ENABLE_LOADING;
}

export class DisableLoadingAction implements Action {
  readonly type = DISABLE_LOADING;
}

export class SetDate implements Action {
  readonly type = SET_DATE;
  public payload: Moment;
  constructor( public now: Moment) {
    this.payload = now;
  }
}
export type calendarActions =
  EnableLoadingAction |
  DisableLoadingAction |
  SetDate;
