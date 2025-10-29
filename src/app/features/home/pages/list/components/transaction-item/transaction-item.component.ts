import { CustomColorDirective } from '@/app/shared/material/buttons/directives/custom-color.directive';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionValueComponent } from './components/transaction-value/transaction-value.component';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    TransactionValueComponent,
    CustomColorDirective,
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();

  edit = output<Transaction>();
  remove = output<Transaction>();
}
