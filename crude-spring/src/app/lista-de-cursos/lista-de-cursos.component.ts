import { CursosFormComponent } from './../cursos/cursos-form/cursos-form.component';
import { DialogAlertComponent } from './../shared/dialog-alert/dialog-alert.component';
import { CursosService } from './../cursos/cursos.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Cursos } from '../models/cursos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-lista-de-cursos',
  templateUrl: './lista-de-cursos.component.html',
  styleUrls: ['./lista-de-cursos.component.scss']
})
export class ListaDeCursosComponent {

    constructor( private cursosService: CursosService, private dialog: MatDialog, private detector: ChangeDetectorRef ) {}

    public cursos!: Cursos[];
    public colunas = [ 'id', 'nome', 'valor', 'categoria', 'actions' ];
    public load:boolean = true;
    private formCad!: MatDialogRef<CursosFormComponent>;

    @ViewChild('table') private table!: MatTable<Cursos>;

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
            this.detector.detectChanges();
            alert(res.message);
            this.table.dataSource = [];
            this.table.dataSource = this.cursos;
          }
        }
      );
    }

}
