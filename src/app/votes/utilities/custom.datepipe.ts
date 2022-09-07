import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any): any {
    return super.transform(value, 'EEEE, M MMMM HH:mm');
  }
}
