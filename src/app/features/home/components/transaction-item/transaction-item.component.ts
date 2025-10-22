import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionValueComponent } from './components/transaction-value/transaction-value.component';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValueComponent],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();
}
