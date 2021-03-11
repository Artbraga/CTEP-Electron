import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageTableResult } from '../page-table-result';

@Component({
    selector: 'custom-paginator',
    templateUrl: './custom-paginator.component.html',
    styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent implements AfterViewInit {
    @Input() pageList: PageTableResult<any>;
    @Output() paginacao = new EventEmitter<number>();
    @ViewChild('paginator') paginator: MatPaginator;

    ngAfterViewInit() {
        this.paginator._intl.firstPageLabel = 'Primeira página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
        this.paginator._intl.nextPageLabel = 'Próxima página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.changes.next();
    }
}
