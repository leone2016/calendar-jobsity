import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printReminder'
})
export class PrintReminderPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
