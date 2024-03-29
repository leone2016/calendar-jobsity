import { Pipe, PipeTransform } from '@angular/core';
import {Reminder} from "../../reminder/reminder.model";

@Pipe({
  name: 'printReminder'
})
export class PrintReminderPipe implements PipeTransform {

  transform(value: Reminder[], ...args: any[]): Reminder[] {
    const day = args[1]+'-'+args[0]['month']+'-'+args[0]['day'];
    return value.filter( x => x.dayCalendar === day);
  }

}
