import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule
  ]
})

export class MaterialModule {

  constructor( private registry: MatIconRegistry, private sanitizer: DomSanitizer ) {
    const ICONS_DIR : string = '../../assets/icons';
    this.registry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl(`${ICONS_DIR}/add.svg`));
  }

}
