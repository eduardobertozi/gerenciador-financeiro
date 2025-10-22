import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BalanceComponent } from './components/balance/balance.component';
import { NoTransactionsComponent } from './components/no-transactions/no-transactions.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';

@Component({
  selector: 'app-home',
  imports: [
    BalanceComponent,
    TransactionItemComponent,
    NoTransactionsComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private transactionService = inject(TransactionsService);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions() {
    this.transactionService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
