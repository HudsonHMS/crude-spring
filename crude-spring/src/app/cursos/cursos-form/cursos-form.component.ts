import { ResponseObject } from './../../models/response-object';
import { CursosService } from './../cursos.service';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cursos } from 'src/app/models/cursos';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Categorias } from 'src/app/models/enuns/Categorias';
import { Aula } from 'src/app/models/aula';
import { CustonValidators } from 'src/app/shared/custon-validators';
import { FormUtilsService } from 'src/app/shared/form-utils.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent {
  public form!: FormGroup;
  public categorias = Object.values(Categorias).filter(
    (el) => typeof el == 'string'
  );
  public curso!: Cursos;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private route: ActivatedRoute,
    private location: Location,
    private detRef: ChangeDetectorRef,
    public formUtil: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      nome: new FormControl<string | null>(null, {
        validators: [
          Validators.maxLength(255),
          Validators.required,
          Validators.minLength(10),
        ],
        updateOn: 'change',
      }),
      categoria: new FormControl<string | null>(null),
      valor: new FormControl<number | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      id: new FormControl<number | null>(null),
      status: new FormControl<number>(0),
    });
  }

  @Output() cadastroSucesso = new EventEmitter<ResponseObject<Cursos>>();

  submitForm() {
    if (this.form.valid) {
      if (!this.data) {
        this.cursosService.cadastrarCurso(this.form.value).subscribe({
          next: (res) => {
            this.cadastroSucesso.emit(res);
          },
          error: (err) =>
            this.snack.open(
              err.status === 404
                ? 'Endereço solicitado não encontrado!'
                : 'Erro ao salvar por favor tente novamente mais tarde',
              '',
              { duration: 3000 }
            ),
          complete: () => {},
        });
        return;
      }

      this.cursosService.atualizarCurso(this.form.value).subscribe({
        next: (res) => {
          this.cadastroSucesso.emit(res);
          if (this.route.snapshot.data['curso']?.responseData) {
            this.location.back();
          }
        },
      });
    } else {
      this.formUtil.validateAllFieldsOnSubmit(this.form);
    }
  }

  public novoCurso( event: MouseEvent ): void {
    event.preventDefault();
    this.aulasArray.push( this.criarAula() );
  }

  ngOnInit(): void {
    if (typeof this.data === 'number') {
      this.cursosService.getCursoPorId(this.data).subscribe({
        next: (res) => {
          this.curso = res.responseData;
          this.form.patchValue(res.responseData);
          this.form.addControl(
            'aulas',
            this.formBuilder.array(this.recuperarAulas(this.curso))
          );
        },
      });
    } else {
      // acesso pela rota e resolver
      const curso: Readonly<Cursos> = this.route.snapshot.data['curso']
        ?.responseData ?? {
        id: null,
        nome: '',
        categoria: '',
        valor: null,
        status: 0
      };
      this.form.setValue(curso);
    }
  }

  ngAfterContentChecked() {
    this.detRef.detectChanges();
  }

  private criarAula(
    aula: Aula = { id: null, nome: '', url: '' }
  ): FormGroup<{ id: FormControl; nome: FormControl; url: FormControl }> {
    return this.formBuilder.group({
      id: new FormControl(aula.id),
      nome: new FormControl(aula.nome, {validators: [Validators.required], updateOn: 'change'}),
      url: new FormControl(aula.url, {validators: [Validators.required, CustonValidators.url()], updateOn: 'change'}),
    });
  }

  private recuperarAulas(
    curso: Cursos
  ): FormGroup<{ id: FormControl; nome: FormControl; url: FormControl }>[] {
    const aulasGroup: FormGroup<{
      id: FormControl;
      nome: FormControl;
      url: FormControl;
    }>[] = [];
    curso?.aulas?.forEach((aula) => aulasGroup.push(this.criarAula(aula)));

    return aulasGroup;
  }

  public getErrorMessage(campo: string): string {
    const field = this.form.get(campo);

    if (field?.hasError('required')) {
      return `O campo ${campo} é obrigatório`;
    }

    if (field?.hasError('minlength')) {
      const minCount: number | null = field.errors
        ? field.errors['minlength']['requiredLength']
        : null;
      return `O valor mínimo para o campo ${campo} é de ${minCount} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const minCount: number | null = field.errors
        ? field.errors['maxlength']['requiredLength']
        : null;
      return `O valor máximo para o campo ${campo} é de ${minCount} caracteres`;
    }

    return 'Houveram erros de validação';
  }

  get formulario() {
    return  this.form;
  }

  private get aulasArray(): FormArray {
    return this.form.get('aulas') as FormArray;
  }
}
