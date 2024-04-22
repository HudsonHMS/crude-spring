import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

constructor() { }

  validateAllFieldsOnSubmit( form: FormGroup | FormArray ): void {
    Object.keys(form.controls).forEach( chave  => {
      const control: AbstractControl | FormArray | FormGroup | null = form.get(chave);

      if( control instanceof AbstractControl ) {
        control.markAsTouched();
      }

      if( control instanceof FormGroup || control instanceof FormArray ) {
        control.markAsTouched();
        this.validateAllFieldsOnSubmit( control );
      }


    })
  }

}
