import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, computed, input } from '@angular/core';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';

@Component({
  selector: 'app-balance',
  imports: [BalanceCardComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  transactions = input.required<Transaction[]>();

  totalIncomes = computed(() => {
    return this.transactions()
      .filter((item) => item.type === 'income')
      .reduce((total, item) => total + item.value, 0);
  });

  totalOutcomes = computed(() => {
    return this.transactions()
      .filter((item) => item.type === 'outcome')
      .reduce((total, item) => total + item.value, 0);
  });

  balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });
}
