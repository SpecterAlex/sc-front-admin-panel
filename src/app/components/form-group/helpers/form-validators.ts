import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IPatternInterface } from 'src/app/core/interfaces/back-end.interface';

export class FormValidators {

    public static matchValues(matchTo: string, message: string): (AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return !!control.parent &&
                !!control.parent.value &&
                control.value === control.parent.controls[matchTo].value
                ? null
                : { invalidPattern: message };
        };
    }

    public static pattern(config: IPatternInterface): ValidatorFn {
        return (control: FormControl): { [key: string]: any } | null => {
            if (control.value !== undefined && control.value !== '' && !control.value.toString().match(config.pattern)) {
                return { invalidPattern: config.message };
            } else {
                return null;
            }
        };
    }

    public static touchAllControls(formGroup: FormGroup | FormArray): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: false });
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.touchAllControls(control);
            }
        });
    }

}
