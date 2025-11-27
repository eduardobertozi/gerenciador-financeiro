import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanizeCurrency',
})
export class HumanizeCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    const formatedValue = formatCurrency(value, 'pt', 'R$');
    const splittedValue = formatedValue.split('.');

    if (splittedValue.length === 1) {
      return splittedValue[0];
    }

    const suffixes = ['K', 'M', 'B', 'T'];

    const suffix = suffixes[splittedValue.length - 2];

    const [firstValue, secondValue] = splittedValue;

    const firstCharOfSecondValue = secondValue.charAt(0);

    if (firstCharOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    } else {
      return `${firstValue}.${secondValue}${suffix}`;
    }
  }
}
