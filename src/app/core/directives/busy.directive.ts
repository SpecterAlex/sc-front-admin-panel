import { Directive, ElementRef, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appBusy]'
})
export class BusyDirective implements OnInit, OnChanges {

  @Input('appBusy') busy: Observable<any>;

  constructor(private el: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.hideSpinner();
  }

  ngOnChanges(): void {
    if (this.busy) {
      this.loading();
      this.busy.subscribe(() => {
        this.finish();
      }, () => {
        this.finish();
      }, () => {
        this.finish();
      });
    }
  }

  private loading(): void {
    this.hideText();
    this.showSpinner();
    this.el.nativeElement.setAttribute('disabled', 'true');
  }

  private finish(): void {
    this.showText();
    this.hideSpinner();
    this.el.nativeElement.removeAttribute('disabled');
  }

  private showSpinnerText(): void {
    this.el.nativeElement.insertAdjacentHTML('beforeend', '<span class="btn-text-spinner">Procesando</span>');
  }
  private hideSpinnerText(): void {
    const btnTextSpinner = this.el.nativeElement.getElementsByClassName('btn-text-spinner')[0];
    if (btnTextSpinner) {
      btnTextSpinner.remove();
    }
  }


  private hideText(): void {
    this.getElementByClassName('btn-text').style.display = 'none';
  }
  private showText(): void {
    this.getElementByClassName('btn-text').style.display = 'block';
  }

  private showSpinner(): void {
    this.showSpinnerText();
    const spinner = this.getElementByClassName('spinner-grow');
    spinner.style.display = 'inline-block';
  }

  private hideSpinner(): void {
    this.hideSpinnerText();
    const spinner = this.getElementByClassName('spinner-grow');
    spinner.style.display = 'none';
  }

  private getElementByClassName(className): HTMLElement {
    return this.el.nativeElement.getElementsByClassName(className)[0] as HTMLElement;
  }
}

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    BusyDirective
  ],
  exports: [
    BusyDirective
  ]
})
export class BusyModule { }
