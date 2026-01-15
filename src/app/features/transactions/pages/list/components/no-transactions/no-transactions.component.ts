import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-transactions',
  imports: [MatCardModule],
  templateUrl: './no-transactions.component.html',
  styleUrl: './no-transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTransactionsComponent {}
