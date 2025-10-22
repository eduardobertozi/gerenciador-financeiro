import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([
    // { title: 'Trabalho Freelance', value: 100, type: TransactionType.INCOME },
    // { title: 'Gasolina', value: 100, type: TransactionType.OUTCOME },
    // { title: 'Venda na Hotmart', value: 75, type: TransactionType.INCOME },
  ]);
}
