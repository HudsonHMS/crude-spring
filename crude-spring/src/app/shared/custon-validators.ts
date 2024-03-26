import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustonValidators {
  static custonValidator( num: number ): ValidatorFn {
    return ( control: AbstractControl ) : ValidationErrors | null => {
      return {numError: num};
    }
  }
}
