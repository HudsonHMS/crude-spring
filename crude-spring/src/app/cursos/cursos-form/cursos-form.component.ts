import { ResponseObject } from './../../models/response-object';
import { CursosService } from './../cursos.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/models/cursos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../shared/dialog-alert/dialog-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent {

  public form!: FormGroup;
  public categorias: string[] = ['Cursos', 'Treinamentos'];

  constructor( private formBuilder: FormBuilder,
               private cursosService: CursosService,
               private errorDialog: MatDialog,
               private snack: MatSnackBar ) {
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
        error: err  =>  this.snack.open( err.status === 404 ? 'Endereço solicitado não encontrado!' :
                                         'Erro ao salvar por favor tente novamente mais tarde', '', { duration: 3000 } ),
        complete: () => {}
      });
    }

  }
}
