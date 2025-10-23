import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { TransactionPayload } from '@/app/shared/transaction/interfaces/transaction';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private readonly transactionService = inject(TransactionsService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected readonly transactionType = TransactionType;

  form = new FormGroup({
    type: new FormControl<TransactionType>(TransactionType.INCOME),
    title: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    value: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form.value.title!,
      type: this.form.value.type!,
      value: this.form.value.value!,
    };

    this.transactionService.post(payload).subscribe({
      next: () => {
        this.snackBar.open('Transação criada com sucesso!', 'Fechar', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        this.router.navigate(['/']);
      },
    });
  }
}
