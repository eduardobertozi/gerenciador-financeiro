import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { sumTransactions } from '@/app/shared/transaction/functions/sum-transactions';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, computed, input } from '@angular/core';
import { BalanceComponent } from './components/balance/balance.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  imports: [BalanceComponent, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input<Transaction[]>([]);

  totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  });

  chartConfig = computed<PieChartConfig>(() => {
    return {
      labels: ['Ganhos', 'Gastos'],
      dataLabel: 'Valor total',
      data: [this.totalIncomes(), this.totalOutcomes()],
    };
  });
}
