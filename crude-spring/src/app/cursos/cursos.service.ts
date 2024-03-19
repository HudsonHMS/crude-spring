import { Injectable } from '@angular/core';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos() :Cursos[] {
    return [
      {id: 1, nome: "Java", valor: 200, categoria: "Cursos"},
      {id: 2, nome: "PHP", valor: 250, categoria: "Cursos"},
      {id: 3, nome: "Angular", valor: 100, categoria: "Cursos"},
      {id: 3, nome: "TypeScript", valor: 150, categoria: "Treinamentos"},
    ];
  }

}
