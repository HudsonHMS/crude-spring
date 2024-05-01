import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Paginate } from 'src/app/models/paginate';
import { ShowPagesOptionsDirective } from './show-pages-options.directive';
import { environment } from 'src/environment/environment ';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {

  private tamanhoPagina!: number;
  private totalRegistros!: number;
  private paginaAtual: number = 0;
  private showPagesOptions: boolean = false;
  @Input()
  public pagesSizeOptions: number[] = environment.qtdPagestoShow;

 @ViewChild(ShowPagesOptionsDirective, {read:ShowPagesOptionsDirective, static: true}) private showOpts!: ShowPagesOptionsDirective;

  @Input() set setPagesSizeOptions( opts: number[] ){
    this.setPagesSizeOptions = opts;
  }

  @Input() set limit(val: number) {
    this.tamanhoPagina = val;
  }
  @Input() set totalItens(val: number) {
    this.totalRegistros = val;
  }

  @Output() paginate = new EventEmitter<Paginate>();

  private qtdPages!: number;

  public set setPaginaAtual( page: number ) {
    this.paginaAtual = page;
  }

  public get getPaginaAtual(): number {
    return this.paginaAtual
  }

  public defaultQtdofPages: number = this.getPagesSizeOptions[0];

  ngOnInit(): void {

    setTimeout(() => {
      this.qtdPagesCalc();
      this.limit = this.defaultQtdofPages;
    }, 500);
  }

  get pages(): number[] {
    return new Array(this.qtdPages);
  }

  public onPaginate(page:number) {

      this.qtdPagesCalc();
      this.setPaginaAtual = page;
      this.paginate.emit({ page: page, limit: this.defaultQtdofPages });

  }

  public set setShowpagesOptions( opt: boolean ) {
    this.showPagesOptions = opt;
  }

  public get getShowpagesOptions(): boolean {
    return this.showPagesOptions;
  }

  public get getPagesSizeOptions () :number[] {
    return this.pagesSizeOptions;
  }

  private qtdPagesCalc() {
    const restoDivisao = this.totalRegistros % this.defaultQtdofPages ? 1 : 0;
    this.qtdPages = Math.trunc(this.totalRegistros / this.defaultQtdofPages) + restoDivisao;
  }

}
