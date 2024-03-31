import { Cursos } from './../models/cursos';
import { delay, from, Observable, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../models/response-object';
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

  getCursoPorId( id: number ): Observable<ResponseObject<Cursos>> {
    try{
      return this.httpClient.get<ResponseObject<Cursos>>(`http://localhost:4300/api/cursos/visualizar/${id}`).pipe(
        take(1),
      );
    } catch( err ) {
      return from([]);
    }
  }

  cadastrarCurso( curso: Cursos ): Observable<ResponseObject<Cursos>> {
    try {
      return this.httpClient.post<ResponseObject<Cursos>>('http://localhost:4300/api/cursos', curso).pipe(
        take(1)
      );
    } catch( err ) {
      return of();
    }
  }

  atualizarCurso( curso: Cursos ): Observable<ResponseObject<Cursos>> {
    try {
      return this.httpClient.post<ResponseObject<Cursos>>('http://localhost:4300/api/cursos/atualizar', curso).pipe(
        take(1)
      );
    } catch( err ) {
      return of();
    }
  }

}
