import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CursosService } from './cursos.service';
import { Observable, of } from 'rxjs';
import { Cursos } from '../models/cursos';
import { ResponseObject } from '../models/response-object';

export const cursosResolver: ResolveFn<Observable<ResponseObject<Cursos>> | null> =  (route, state) => {
  const cursoService = inject(CursosService);

  if( route?.params && route?.params['id'] ) {
    return cursoService?.getCursoPorId( route?.params['id'] );
  }
  return of({ statusCode: 404, message: 'Sem dados para exibir', responseData: {id: null, nome: '', categoria: '', valor: null, aulas: []}});
};
