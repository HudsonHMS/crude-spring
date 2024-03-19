import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatTableModule
  ]
})

export class MaterialModule {

  constructor( private registry: MatIconRegistry, private sanitizer: DomSanitizer ) {
    const ICONS_DIR : string = '../../assets/icons';
    this.registry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl(`${ICONS_DIR}/add.svg`));
  }

}
