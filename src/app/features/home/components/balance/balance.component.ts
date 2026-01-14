import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { sumTransactions } from '@/app/shared/transaction/functions/sum-transactions';
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
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  });

  balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });
}
