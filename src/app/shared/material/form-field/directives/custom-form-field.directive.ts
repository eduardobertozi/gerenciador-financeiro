/* eslint-disable @angular-eslint/directive-selector */
import { Directive } from '@angular/core';
import { FullWidthDirective } from './full-width.directive';
import { MarginBottomDirective } from './margin-bottom.directive';

@Directive({
  selector: 'mat-form-field', // Usa o seletor do mat-form-field para aplicar as diretivas à ele quando importada a diretiva
  hostDirectives: [
    {
      directive: MarginBottomDirective,
      inputs: ['appMarginBottom: mb'],
    },
    {
      directive: FullWidthDirective,
      inputs: ['appFullWidth'],
    },
  ],
})
export class CustomFormFieldDirective {}
