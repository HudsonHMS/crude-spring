import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeCursosComponent } from '../lista-de-cursos/lista-de-cursos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaDeCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
