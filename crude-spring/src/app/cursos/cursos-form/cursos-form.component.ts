import { ResponseObject } from './../../models/response-object';
import { CursosService } from './../cursos.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/models/cursos';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent {

  public form!: FormGroup;

  constructor( private formBuilder: FormBuilder, private cursosService: CursosService ) {
    this.form = this.formBuilder.group({
      nome: [null, {
        validators: [Validators.maxLength(255), Validators.required],
        updateOn: 'change'
      }],
      categoria: [null],
      valor: [null, {
        validators: [Validators.required],
        updateOn: 'change'
      }]
    })
  }

  @Output() cadastroSucesso  = new EventEmitter<ResponseObject<Cursos>>();

  submitForm() {

    if( this.form.valid ) {
      this.cursosService.cadastrarCurso( this.form.value ).subscribe({
        next:  (res) => {
          this.cadastroSucesso.emit( res )
        },
        error: err  => console.log( err ),
        complete: () => {}
      });
    }

  }
}
