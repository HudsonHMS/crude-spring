import { CursosFormComponent } from './../cursos/cursos-form/cursos-form.component';
import { DialogAlertComponent } from './../shared/dialog-alert/dialog-alert.component';
import { CursosService } from './../cursos/cursos.service';
import { Component, ViewChild } from '@angular/core';
import { Cursos } from '../models/cursos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment ';
import { Paginate } from '../models/paginate';

@Component({
  selector: 'app-lista-de-cursos',
  templateUrl: './lista-de-cursos.component.html',
  styleUrls: ['./lista-de-cursos.component.scss']
})
export class ListaDeCursosComponent {

    constructor( private cursosService: CursosService,
                 private dialog: MatDialog,
                 private snack: MatSnackBar ) {}

    public cursos!: Cursos[];
    public colunas = [ 'id', 'nome', 'valor', 'categoria', 'actions' ];
    public load:boolean = true;
    private formCad!: MatDialogRef<CursosFormComponent>;
    public totalPages!: number | undefined;
    public totalElements!: number | undefined;

    get limit() : number {
      return environment.qtdItensPaginaCursos;
    }
    get initialPage() : number {
      return environment.paginaInicial;
    }

    @ViewChild('table') private table!: MatTable<Cursos>;

    ngOnInit(): void {
      this.getCursos( this.initialPage, this.limit );
    }

    openError( msg: string, width: string, heigth: string ): void {
      this.dialog.open(DialogAlertComponent, {
        data: msg,
        width: width,
        height: heigth,
      });
    }

    closeError(): void {
      this.dialog.closeAll();
    }

    openCadastro( largura = '75dvw', altura = '60dvh' ) {

      this.dialog.open(CursosFormComponent, {
        width: largura,
        height: altura
      }).componentInstance.cadastroSucesso.subscribe(
        ( res ) => {
          if( res.statusCode === 201 ) {
            this.dialog.closeAll();
            this.cursos.push( res.responseData );
            alert(res.message);
            this.table.dataSource = [];
            this.table.dataSource = this.cursos;
          }
        }
      );
    }
    openEdicao( id: number, largura = '75dvw', altura = '80dvh' ) {

      this.dialog.open(CursosFormComponent, {
        width: largura,
        height: altura,
        data: id,
        id: 'formEdicao'
      }).componentInstance.cadastroSucesso.subscribe(
        (res) => {
          this.table.dataSource = [];
          this.table.dataSource = this.cursos.map( (curso) => curso.id === res.responseData.id ? curso = res.responseData : curso );
          this.openError("Curso atualizado com sucesso!", '300px', '200px');
          this.dialog.getDialogById('formEdicao')?.close();
        }
      );
    }

    public deleteCurso( id: number ) {
      Swal.fire({
        html: "<b>realmente deseja excluir este curso?</b>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then(
        opt => {
          if(opt.isConfirmed) {
              this.cursosService.deletarCurso( id ).subscribe({
                next: res => {
                    this.cursos = this.cursos.filter( el => el.id != id );
                    this.table.dataSource = [];
                    this.table.dataSource = this.cursos;
                    this.snack.open("Curso delatado com sucess!", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
                },
                error: (err) => {
                    this.openError("Houveram erros ao deletar. Tente novamente mais tarde!", '400px', '300px');
                },
              });
          }
        }
      );
    }

    public paginate( event: Paginate ) {
      this.getCursos( event.page, event.limit );
    }

    private getCursos( page: number, limit: number ): void {
      this.load = true;
      this.cursosService.getCursos( page, limit ).subscribe(
        {
          next: (cursos) => {
            this.cursos = cursos.responseData
            this.totalPages = cursos.totalPages;
            this.totalElements = cursos.totalRegistros;
          },
          error: (err) => {
            this.openError( 'Hoveram erros ao buscar os dados!!', '400px', '195px' )
            this.load = false
          },
          complete: () => {
            this.load = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      );
    }

}
