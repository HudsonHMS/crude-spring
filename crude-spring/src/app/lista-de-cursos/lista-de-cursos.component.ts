import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-de-cursos',
  templateUrl: './lista-de-cursos.component.html',
  styleUrls: ['./lista-de-cursos.component.scss']
})
export class ListaDeCursosComponent {
    public cursos: string[] = ['Java', 'PHP', 'Angular'];

    ngOnInit(): void {

    }
}
