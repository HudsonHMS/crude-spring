import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaDeCursosComponent } from '../lista-de-cursos/lista-de-cursos.component';


@NgModule({
  declarations: [
    ListaDeCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
