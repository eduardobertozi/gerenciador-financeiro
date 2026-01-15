import { CustomColorDirective } from '@/app/shared/material/buttons/directives/custom-color.directive';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TransactionValueComponent } from './components/transaction-value/transaction-value.component';
import { IsIncomeDirective } from './directives/is-income.directive';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TransactionValueComponent,
    CustomColorDirective,
    IsIncomeDirective,
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();

  edit = output<Transaction>();
  remove = output<Transaction>();
}
