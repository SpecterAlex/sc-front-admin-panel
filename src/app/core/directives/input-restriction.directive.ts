import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {

  @Input() appInputRestriction: string;

  private lastValidValue = '';

  constructor(
    private elementRef: ElementRef,
    private control: NgControl,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  @HostListener('input')
  onChange(): void {
    switch (this.appInputRestriction) {
      case 'onlyNumbers':
        this.inputRestriction(/^\+?[0-9\-]+$/);
        break;
    }
  }

  private inputRestriction(regEx: RegExp): void {
    const value = this.elementRef.nativeElement.value;
    if (!value || value === '') {
      this.lastValidValue = '';
      this.elementRef.nativeElement.value = '';
      this.control.control.setValue('');
      this.changeDetectorRef.detectChanges();
    }
    const urlRegEx = regEx;
    if (value && value !== '' && value.toString().match(urlRegEx)) {
      this.lastValidValue = value;
      this.elementRef.nativeElement.value = value;
      this.changeDetectorRef.detectChanges();
    } else {
      this.elementRef.nativeElement.value = this.lastValidValue;
      this.control.control.setValue(this.lastValidValue);
      this.changeDetectorRef.detectChanges();
    }
  }
}


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    InputRestrictionDirective
  ],
  exports: [
    InputRestrictionDirective
  ]
})
export class InputRestrictionModule { }

