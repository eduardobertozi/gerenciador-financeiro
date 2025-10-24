import { ConfirmationDialogService } from '@/app/shared/dialog/confirmation/service/confirmation-dialog.service';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
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
  private readonly transactionService = inject(TransactionsService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly confirmationDialogService = inject(
    ConfirmationDialogService,
  );

  private readonly router = inject(Router);

  protected transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService
      .open({
        title: 'Remover Transação',
        message: 'Tem certeza que deseja remover esta transação?',
      })
      .subscribe({
        next: () => {
          this.removeTransaction(transaction);
          this.feedbackService.success('Transação removida com sucesso!');
        },
      });
  }

  private removeTransaction(transaction: Transaction) {
    this.transactionService.delete(transaction.id).subscribe({
      next: () =>
        this.transactions.update((transactions) => {
          return transactions.filter((item) => item.id !== transaction.id);
        }),
    });
  }

  private getTransactions() {
    this.transactionService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
