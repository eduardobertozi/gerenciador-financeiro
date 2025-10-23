import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import {
  Transaction,
  TransactionPayload,
} from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly transactionService = inject(TransactionsService);
  private readonly feedback = inject(FeedbackService);
  private readonly router = inject(Router);

  protected readonly transactionType = TransactionType;

  get transaction(): Transaction | null {
    return this.activatedRoute.snapshot.data['transaction'] ?? null;
  }

  get isEdit(): boolean {
    return Boolean(this.transaction);
  }

  form = new FormGroup({
    type: new FormControl<string>(this.transaction?.type ?? '', {
      validators: [Validators.required],
    }),
    title: new FormControl<string>(this.transaction?.title ?? '', {
      validators: [Validators.required],
    }),
    value: new FormControl<number | null>(this.transaction?.value ?? null, {
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      type: this.form.value.type as TransactionType,
      value: this.form.value.value as number,
    };

    if (this.isEdit) {
      return this.updateTransaction(payload);
    }

    this.createTransaction(payload);
  }

  private createTransaction(payload: TransactionPayload) {
    this.transactionService.post(payload).subscribe({
      next: () => {
        this.feedback.success('Transação criada com sucesso!');
        this.router.navigate(['/']);
      },
    });
  }

  private updateTransaction(payload: TransactionPayload) {
    if (!this.transaction) {
      return;
    }

    this.transactionService.put(this.transaction.id, payload).subscribe({
      next: () => {
        this.feedback.success('Transação atualizada com sucesso!');
        this.router.navigate(['/']);
      },
    });
  }
}
