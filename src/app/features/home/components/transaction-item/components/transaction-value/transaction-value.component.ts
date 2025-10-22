import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  styleUrl: './transaction-value.component.scss',
  host: {
    '[class]': 'cssClass()',
  },
  template: `
    {{ transaction().value | currency: 'BRL' }}
  `,
})
export class TransactionValueComponent {
  transaction = input.required<Transaction>();
  cssClass = computed(() => CssClasses[this.transaction().type]);
}
