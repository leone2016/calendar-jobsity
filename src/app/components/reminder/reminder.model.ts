
export class Reminder {
  code: string;
  city: string;
  isAllDay: boolean;
  dateStart: string;
  dateEnd: string;
  dayCalendar: string;
  monthCalendar: string;
  description: string;
  color: string;

  constructor( obj: ReminderObj ) {
    this.code = obj && obj.code || null;
    this.city = obj && obj.city || null;
    this.isAllDay = obj && obj.isAllDay || null;
    this.dateStart = obj && obj.dateStart || null;
    this.dateEnd = obj && obj.dateEnd || null;
    this.description = obj && obj.description || null;
    this.dayCalendar = obj && obj.dayCalendar || null;
    this.monthCalendar = obj && obj.monthCalendar || null;
    this.color = obj && obj.color || null;
  }
}

interface ReminderObj {
  code: string;
  city: string;
  isAllDay: boolean;
  dateStart: string;
  dateEnd: string;
  dayCalendar: string;
  monthCalendar: string;
  description: string;
  color: string;
}
