import { ConfirmationDialogService } from '@/app/shared/dialog/confirmation/service/confirmation-dialog.service';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NoTransactionsComponent } from './components/no-transactions/no-transactions.component';
import { SearchComponent } from './components/search/search.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';

@Component({
  selector: 'app-list',
  imports: [
    TransactionsContainerComponent,
    TransactionItemComponent,
    MatButtonModule,
    RouterLink,
    NoTransactionsComponent,
    SearchComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly transactionService = inject(TransactionsService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // transactions = input<Transaction[]>([]);
  // items = linkedSignal(() => this.transactions());

  searchTerm = signal<string>('');

  resourceRef = rxResource({
    params: () => {
      return {
        searchTerm: this.searchTerm(),
      };
    },
    stream: ({ params }) => {
      return this.transactionService.getAll(params.searchTerm);
    },
    defaultValue: [],
  });

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], {
      relativeTo: this.activatedRoute,
    });
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
    this.resourceRef.update((transactions) => transactions.filter((item) => item.id !== transaction.id));
  }
}
