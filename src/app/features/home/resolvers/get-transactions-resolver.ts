import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const getTransactionsResolver: ResolveFn<Transaction[]> = () => {
  const transactionService = inject(TransactionsService);
  return transactionService.getAll();
};
