import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const getTransactionByIdResolver: ResolveFn<Transaction | null> = (route) => {
  const transactionsService = inject(TransactionsService);
  const id = route.paramMap.get('id');

  if (!id) {
    return null;
  }

  return transactionsService.getById(id);
};
