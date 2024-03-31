import { ResponseObject } from './../../models/response-object';
import { CursosService } from './../cursos.service';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/models/cursos';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  public curso!: Cursos;

  constructor( private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private errorDialog: MatDialog,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formRef: MatDialogRef<CursosFormComponent> ) {
      this.form = this.formBuilder.group({
        nome: new FormControl<string|null>(null, {
          validators: [Validators.maxLength(255), Validators.required],
          updateOn: 'change',
        }),
        categoria: new FormControl<string|null>(null),
        valor: new FormControl<number|null>(null, {
          validators: [Validators.required],
          updateOn: 'change'
        }),
        id: new FormControl<number|null>(null)
      })
    }

  @Output() cadastroSucesso  = new EventEmitter<ResponseObject<Cursos>>();

  submitForm() {

    if( this.form.valid ) {
      if( !this.data ) {
        this.cursosService.cadastrarCurso( this.form.value ).subscribe({
          next:  (res) => {
            this.cadastroSucesso.emit( res )
          },
          error: err  =>  this.snack.open( err.status === 404 ? 'Endereço solicitado não encontrado!' :
                                           'Erro ao salvar por favor tente novamente mais tarde', '', { duration: 3000 } ),
          complete: () => {}
        });
        return;
      }

      this.cursosService.atualizarCurso( this.form.value ).subscribe({
        next: (res) => {
          this.cadastroSucesso.emit( res );
        }
      });

    }

  }

  ngOnInit(): void {
    if( this.data ) {
      this.cursosService.getCursoPorId( this.data ).subscribe( {
        next: ( res ) => {
          this.curso = res.responseData;
          this.form.patchValue( res.responseData );
        }
      } );
    }
  }

}
