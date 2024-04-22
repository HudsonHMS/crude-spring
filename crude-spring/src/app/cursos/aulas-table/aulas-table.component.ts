import { AulasService } from './../aulas/aulas.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'aulas-table',
  templateUrl: './aulas-table.component.html',
  styleUrls: ['./aulas-table.component.css']
})
export class AulasTableComponent  {

  @Input() form!: FormGroup;

  constructor(private detRef: ChangeDetectorRef, private aulaService: AulasService) { }

  getAulasControls(): FormArray {
    return this.form?.get('aulas') as FormArray;
  }

  public removeAula( index: number, evt: MouseEvent ): void {
    evt.preventDefault();
    const aulaId = parseInt( this.getAulasControls().at(index)?.get("id")?.value ) ?? null;
    this.aulaService.deletarAulaById( aulaId ).subscribe({
      next: (ret) => this.getAulasControls().removeAt(index),
      error: (err) => console.log( err )
    });
  }

  public getErroMessages( control: AbstractControl | null ): string {
    if( control?.hasError('required') ) {
      return "O campo obrigatório favor preencher!";
    }
    if( control?.hasError('url') ) {
      return "A url informada não é válida!";
    }

    return "";
  }

  ngAfterContentChecked() {
    this.detRef.detectChanges();
  }

}
