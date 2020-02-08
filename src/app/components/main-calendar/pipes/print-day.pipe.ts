import { Pipe, PipeTransform } from '@angular/core';
import {Calendar} from '../main-calendar.component';

@Pipe({
  name: 'printDay'
})
export class PrintDayPipe implements PipeTransform {
  transform(value: Calendar[], args: number): any {
    return value.slice(args * 7,  (args * 7) + 7);
  }
}
