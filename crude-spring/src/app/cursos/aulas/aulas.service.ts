import { ResponseObject } from './../../models/response-object';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Aula } from 'src/app/models/aula';
import { environment } from 'src/environment/environment ';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor( private client: HttpClient ) { }

  public deletarAulaById( id: number ): Observable<ResponseObject<boolean>> {
    if( id ) {
      const url = `${environment.baseApiUrl}aulas/${id}`;
      return this.client.delete<ResponseObject<boolean>>(url).pipe( take(1) );
    }
    return of({ responseData: false,
                message: "Hoveram erros ao executar",
                statusCode: 400 });
  }

}
