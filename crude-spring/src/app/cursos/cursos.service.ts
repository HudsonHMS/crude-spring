import { Cursos } from './../models/cursos';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor( private httpClient: HttpClient ) { }

  getCursos(): Observable<Cursos[]> {
    try{
      return this.httpClient.get<Cursos[]>('/assets/cursos.json');
    } catch( err ) {
      console.log( err );
      return from([]);
    }
  }

}
