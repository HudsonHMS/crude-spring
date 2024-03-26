import { Cursos } from './../models/cursos';
import { delay, from, Observable, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor( private httpClient: HttpClient ) { }

  getCursos(): Observable<Cursos[]> {
    try{
      return this.httpClient.get<Cursos[]>('http://localhost:4300/api/cursos').pipe(
        take(1),
        //delay(1000)
      );
    } catch( err ) {
      return from([]);
    }
  }

  cadastrarCurso( curso: Cursos ): Observable<Cursos> {
    try {
      return this.httpClient.post<Cursos>('http://localhost:4300/api/cursos', curso).pipe(
        take(1)
      );
    } catch( err ) {
      return of();
    }
  }

}
