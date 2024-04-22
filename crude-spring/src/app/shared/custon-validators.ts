import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustonValidators {
  static custonValidator( num: number ): ValidatorFn {
    return ( control: AbstractControl ) : ValidationErrors | null => {
      return {numError: num};
    }
  }

  static url () : ValidatorFn {
    return ( control: AbstractControl ) : ValidationErrors | null => {
      const patern:RegExp = new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm);

      return !patern.test(control.value) ? {'url': true} : null;
    }
  }

}
