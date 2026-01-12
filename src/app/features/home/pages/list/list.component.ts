import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BalanceComponent } from './components/balance/balance.component';

@Component({
  selector: 'app-list',
  imports: [BalanceComponent, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  transactions = input<Transaction[]>([]);
  items = linkedSignal(() => this.transactions());
}
