import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { PaginatorComponent } from './paginator.component';

@Directive({
  selector: 'app-paginator[showPagesOptions]',
  exportAs: 'showPagesOptions',
})
export class ShowPagesOptionsDirective {

  private paginator: PaginatorComponent;
  constructor( private el: PaginatorComponent ) {
    this.paginator = this.el;
    this.paginator.setShowpagesOptions = true
  }

  public get getPaginatorRef() : PaginatorComponent {
    return this.paginator;
  }

}
