import { CursosFormComponent } from './../cursos/cursos-form/cursos-form.component';
import { DialogAlertComponent } from './../shared/dialog-alert/dialog-alert.component';
import { CursosService } from './../cursos/cursos.service';
import { Component } from '@angular/core';
import { Cursos } from '../models/cursos';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-de-cursos',
  templateUrl: './lista-de-cursos.component.html',
  styleUrls: ['./lista-de-cursos.component.scss']
})
export class ListaDeCursosComponent {

    constructor( private cursosService: CursosService, private dialogRef: MatDialog ) {}

    public cursos!: Cursos[];
    public colunas = [ 'id', 'nome', 'valor', 'categoria', 'actions' ];
    public load:boolean = true;

    ngOnInit(): void {

      this.cursosService.getCursos().subscribe(
        {
          next: (cursos) => {
            this.cursos = cursos
          },
          error: (err) => {
            this.openError( 'Hoveram erros ao buscar os dados!!', '400px', '195px' )
            this.load = false
          },
          complete: () => { this.load = false }
        }
      );
    }

    openError( msg: string, width: string, heigth: string ): void {
      this.dialogRef.open(DialogAlertComponent, {
        data: msg,
        width: width,
        height: heigth,
      });
    }

    closeError(): void {
      this.dialogRef.closeAll();
    }

    openCadastro( largura = '75dvw', altura = '55dvh' ) {
      this.dialogRef.open(CursosFormComponent, {
        width: largura,
        height: altura
      });
    }

}
