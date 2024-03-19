import { CursosService } from './../cursos/cursos.service';
import { Component } from '@angular/core';
import { Cursos } from '../models/cursos';

@Component({
  selector: 'app-lista-de-cursos',
  templateUrl: './lista-de-cursos.component.html',
  styleUrls: ['./lista-de-cursos.component.scss']
})
export class ListaDeCursosComponent {

    constructor( private cursosService: CursosService ) {}

    public cursos!: Cursos[];
    public colunas = [ 'id', 'nome', 'valor', 'categoria', 'actions' ];

    ngOnInit(): void {
      this.cursos = this.cursosService.getCursos();
    }
}
