import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  readonly transactionType = TransactionType;

  form = new FormGroup({
    type: new FormControl<TransactionType>(TransactionType.OUTCOME),
    title: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    value: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
  });
}
