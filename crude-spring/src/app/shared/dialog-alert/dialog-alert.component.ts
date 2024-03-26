import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<DialogAlertComponent> ) {}

  closeError(): void {
    this.dialogRef.close();
  }

}
