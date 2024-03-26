import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria',
})
export class CategoriaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let icone: string = '';
    switch(value.toLowerCase()) {
      case 'cursos' :
        icone = 'done';
        break;
      case 'treinamentos':
        icone = 'school';
        break;
      default: icone = 'home'
    }
    return icone;
  }

}
