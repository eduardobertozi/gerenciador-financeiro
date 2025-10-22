import { TransactionType } from '@/app/shared/transaction/enums/transaction-type';
import { JsonPipe } from '@angular/common';
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
    JsonPipe,
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
    value: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });
}
