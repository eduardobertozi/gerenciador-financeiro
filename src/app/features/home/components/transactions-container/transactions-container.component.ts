import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-transactions-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss',
})
export class TransactionsContainerComponent {
  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');
  noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
