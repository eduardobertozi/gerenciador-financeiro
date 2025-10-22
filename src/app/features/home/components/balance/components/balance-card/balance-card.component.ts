import { Component, computed, input, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClasses = 'income' | 'outcome' | 'zero';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
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
