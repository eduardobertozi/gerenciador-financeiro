import { Component, computed, input, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from './pipes/humanize-currency-pipe';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClasses = 'income' | 'outcome' | 'zero';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizeCurrencyPipe],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss',
})
export class BalanceCardComponent {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass: Signal<ValueCssClasses> = computed(() => {
    if (this.type() === 'income') {
      return 'income';
    }

    if (this.type() === 'outcome') {
      return 'outcome';
    }

    if (this.value() === 0) {
      return 'zero';
    }

    return this.value() > 0 ? 'income' : 'outcome';
  });
}
