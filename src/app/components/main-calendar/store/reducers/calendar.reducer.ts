
import {Moment} from 'moment';
import * as moment from 'moment';
import {calendarActions, DISABLE_LOADING, ENABLE_LOADING, SET_DATE} from "../calendar.action";
export interface ICalendarState {
  isLoading?: boolean;
  now: Moment;
}

const CALENDAR_INITIAL_STATE: ICalendarState = {
  isLoading: false,
  now: moment()
}

export function calendarReducer(
  state: ICalendarState = CALENDAR_INITIAL_STATE,
  action: calendarActions
): ICalendarState {
  switch ( action.type ) {
    case ENABLE_LOADING:
      return {
        ...state,
        isLoading: true
      };
      case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case SET_DATE:
      return {
        ...state,
        now: action.now
      }
    default:
      return state;

  }

}
