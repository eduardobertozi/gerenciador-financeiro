import { ConfirmationDialogService } from '@/app/shared/dialog/confirmation/service/confirmation-dialog.service';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { NoTransactionsComponent } from './components/no-transactions/no-transactions.component';
import { SearchComponent } from './components/search/search.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';

function typeDelay(signal: Signal<string>) {
  const observable = toObservable(signal).pipe(debounceTime(500));
  return toSignal(observable, { initialValue: '' });
}

@Component({
  selector: 'app-list',
  imports: [
    RouterLink,
    TransactionsContainerComponent,
    TransactionItemComponent,
    NoTransactionsComponent,
    SearchComponent,
    MatButtonModule,
    MatProgressBarModule,
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

  protected searchTerm = signal<string>('');
  private resourceRef = this.transactionService.getAllWithHttpResource(typeDelay(this.searchTerm));

  protected isLoading = computed(() => this.resourceRef.isLoading());
  protected transactions = computed(() => this.resourceRef.value());

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
