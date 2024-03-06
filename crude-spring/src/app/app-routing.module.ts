import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-cursos'
  },
  {
    path: 'listar-cursos',
    loadChildren: () => import('./cursos/cursos-routing.module').then( m => m.CursosRoutingModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
