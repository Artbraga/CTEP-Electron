import { CustomTemplate } from '../shared/customTemplate';
import { Coluna, ColumnGroup } from '../base-table';
import { Sort } from '@angular/material/sort';

import {
    Component,
    OnInit,
    Input,
    TemplateRef,
    QueryList,
    ContentChildren,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements AfterViewInit {
    constructor() { }

    @ContentChildren(CustomTemplate) templates: QueryList<any>;

    @Input() paginated = false;
    @Input() listOfElements: any[] = [];
    @Input() columns: Coluna[] = [];
    @Input() colGroups: ColumnGroup[] = [];
    @Input() loading = false;
    @Input() scrollHeight: string = null;
    @Input() emptyMessage = 'Nenhum registro adicionado.';
    @Input() headerFixed = false;
    @Input() paginateData: any;
    @Input() paginaAtual: number;
    @Input() maxHeigth = '60vh';
    @Input() headerTemplate: string;

    @Output() elementClick = new EventEmitter<any>();
    @Output() sort = new EventEmitter<any>();

    public templatesCustomTable: { [nome: string]: TemplateRef<any> } = {};
    displayedColumns2 = this.displayedColumns();
    dataSource = new MatTableDataSource(this.listOfElements);
    @Output() changePage = new EventEmitter<PageEvent>();
    pageEvent: PageEvent;


    sortData(sort: Sort) {
        this.sort.emit({
            sortField: this.columns.find(x => x.key === sort.active).sortField || this.columns.find(x => x.key === sort.active).field,
            dir: sort.direction
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.templates.forEach(item => {
                this.templatesCustomTable[item.name] = item.template;
            });
        }, 0);
    }

    public displayedColumns(group = null): string[] {
        if (group == null) {
            return this.columns.map(c => c.key);
        }
        return this.columns
            .filter(c => {
                if (typeof c.groupKey === typeof '') {
                    return c.groupKey === group;
                } else if (typeof c.groupKey === typeof []) {
                    return c.groupKey.includes(group);
                }
            })
            .map(c => c.key);
    }

    public resolveField(obj: any, field: string) {
        if (field == null || field.trim() === '') { return null; }
        let fields = field.split('.');
        if (fields.length > 1) {
            const campo = fields[0];
            fields = fields.slice(1);
            if (obj[campo] != null) {
                return this.resolveField(obj[campo], fields.join('.'));
            }
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        return obj[field];
    }

    public isNumber(obj: any, field: string, numerico?: boolean) {
        if (numerico) {
            return 'alinhaNumerosADireita';
        } else {
            if (field == null || field.trim() === '') {
                return null;
            }
            let fields = field.split('.');
            if (fields.length > 1) {
                const campo = fields[0];
                fields = fields.slice(1);
                if (obj[campo] != null) {
                    return this.isNumber(obj[campo], fields.join('.'));
                }
            }
            if (typeof obj[field] === 'number') {
                return 'alinhaNumerosADireita';
            }
        }
    }

    stringTooltip(element: any, col: Coluna, isTooltip: boolean) {
        const str = this.resolveField(element, col.field);
        if (isTooltip) {
            return str
        }
        return str.substr(0, col.tooltipMinSize) + '...';
    }

    mostrarTooltip(element: any, col: Coluna) {
        if (col.addTooltip) {
            const str: string = this.resolveField(element, col.field);
            if (str.length > col.tooltipMinSize) {
                return true;
            }
        }
        return false;
    }

    public elementClicked(element, event) {
        if (event.target.localName !== 'button' &&
            event.target.offsetParent.localName !== 'button') {
            this.elementClick.emit(element);
        }
    }

    isEmpty(): boolean {
        if (this.loading) { return false; }
        if (this.listOfElements == null || this.listOfElements.length === 0) {
            return true;
        }
        return false;
    }

    onChangePage($event, paginator) {

        if (paginator.hasNextPage()) {
            $event.pageIndex++;
            this.pageEvent = $event;
            this.changePage.emit(this.pageEvent);
        }
    }
}
