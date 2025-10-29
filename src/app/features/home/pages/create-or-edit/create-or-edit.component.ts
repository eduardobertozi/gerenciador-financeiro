import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { FullWidthDirective } from '@/app/shared/material/form-field/directives/full-width.directive';
import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import {
  Transaction,
  TransactionPayload,
} from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Component, computed, inject, input } from '@angular/core';
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
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    FullWidthDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent {
  private readonly transactionService = inject(TransactionsService);
  private readonly feedback = inject(FeedbackService);
  private readonly router = inject(Router);

  protected transaction = input<Transaction | null>(null);
  protected readonly transactionType = TransactionType;

  isEdit = computed(() => Boolean(this.transaction()));

  form = computed(
    () =>
      new FormGroup({
        type: new FormControl<string>(this.transaction()?.type ?? '', {
          validators: [Validators.required],
        }),
        title: new FormControl<string>(this.transaction()?.title ?? '', {
          validators: [Validators.required],
        }),
        value: new FormControl<number | null>(
          this.transaction()?.value ?? null,
          {
            validators: [Validators.required],
          },
        ),
      }),
  );

  submit() {
    if (this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      type: this.form().value.type as TransactionType,
      value: this.form().value.value as number,
    };

    this.createOrEdit(payload).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionService
        .put(this.transaction()!.id, payload)
        .pipe(
          tap(() => this.feedback.success('Transação atualizada com sucesso!')),
        );
    } else {
      return this.transactionService
        .post(payload)
        .pipe(
          tap(() => this.feedback.success('Transação criada com sucesso!')),
        );
    }
  }
}
