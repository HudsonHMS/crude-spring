import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeCursosComponent } from '../lista-de-cursos/lista-de-cursos.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { cursosResolver } from './cursos.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListaDeCursosComponent
  },
  {
    path: 'editar/:id',
    component: CursosFormComponent,
    resolve: { curso: cursosResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
