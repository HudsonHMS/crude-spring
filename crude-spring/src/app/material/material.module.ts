import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})

export class MaterialModule {

  constructor( private registry: MatIconRegistry, private sanitizer: DomSanitizer ) {
    const ICONS_DIR : string = '../../assets/icons';
    this.registry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl(`${ICONS_DIR}/add.svg`));
  }

}
