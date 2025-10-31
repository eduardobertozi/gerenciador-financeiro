import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  /**
   * set margin bottom value in pixels ex: 24px
   * default is 24px
   */
  marginBottom = input('', {
    alias: 'appMarginBottom',
    transform: (value: string) => value || '24px',
  });

  constructor() {
    effect(() => {
      if (this.marginBottom()) {
        this.renderer2.setStyle(
          this.elementRef.nativeElement,
          'margin-bottom',
          this.marginBottom(),
        );
      }
    });
  }
}
