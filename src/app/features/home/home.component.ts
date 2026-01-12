import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, input } from '@angular/core';
import { BalanceComponent } from './components/balance/balance.component';

@Component({
  selector: 'app-home',
  imports: [BalanceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input<Transaction[]>([]);
}
