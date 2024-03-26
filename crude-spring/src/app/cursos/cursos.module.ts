import { ReactiveFormsModule } from '@angular/forms';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { DialogAlertComponent } from './../shared/dialog-alert/dialog-alert.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaDeCursosComponent } from '../lista-de-cursos/lista-de-cursos.component';
import { CategoriaPipe } from '../shared/pipes/categoria.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    ListaDeCursosComponent,
    DialogAlertComponent,
    CategoriaPipe,
    CursosFormComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class CursosModule { }
