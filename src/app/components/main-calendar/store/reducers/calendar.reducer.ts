
import {Moment} from 'moment';
import * as moment from 'moment';
import {
  CalendarActions,
  DISABLE_LOADING,
  ENABLE_LOADING,
  LOAD_WEATHER,
  SET_DATE,
  SET_REMINDER
} from "../calendar.action";
import {Reminder} from "../../../reminder/reminder.model";
import {WeatherModel} from "../../model/wwather.model";
export interface ICalendarState {
  isLoading?: boolean;
  now: Moment;
  reminder: Reminder[];
  weather?: WeatherModel;
}

const CALENDAR_INITIAL_STATE: ICalendarState = {
  isLoading: false,
  now: moment(),
  reminder:[{
    code: '',
    city: '',
    isAllDay: false,
    dateStart: '',
    dateEnd: '',
    dayCalendar: '',
    monthCalendar: '',
    description: '',
    color: ''
  }],

}

export function calendarReducer(
  state: ICalendarState = CALENDAR_INITIAL_STATE,
  action: CalendarActions
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
      };
    case SET_REMINDER:
      return {
        ...state,
        reminder: action.payload
      };
    case LOAD_WEATHER:
        return {
          ...state,
          weather: action.payload
        };
    default:
      return state;

  }

}
