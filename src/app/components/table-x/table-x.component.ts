/// <reference path="../../jquery.d.ts" />

import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output, ContentChildren, QueryList } from '@angular/core';
import { MenuItem, DomHandler, PrimeTemplate } from 'primeng/primeng';
import { Table } from 'primeng/table';

@Component({
    selector: 'table-x',
    templateUrl: './table-x.component.html'
})
export class TableXComponent {
    @Input() colunas: Coluna[];
    _value: any = [];
    @Input() set value(valor) {
        this._value = valor;
        if (valor == null) {
            this.tt.expandedRowKeys = {}; // Fechar expandidos quando muda o conteúdo da tabela.
        }
    }
    get value(): any[] {
        return this._value;
    }

    @Input() emptyMessage: string = "Nenhum dado para ser exibido."
    @Input() loading: boolean;
    @Input() dataKey: string = "Id";
    @Input() rowTrackBy: Function;
    @Input() selectionMode: string;
    _selection: any;
    @Input() get selection(): any[] {
        return this._selection;
    }
    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    set selection(valor) {
        this._selection = valor;
        this.selectionChange.emit(this._selection);
    }

    @Input() reorderableRow: boolean = false;
    @Input() filterDelay: number = 0;
    @Input() expandable: boolean = false;
    @Input() expandableAll: boolean = true;
    @Input() infiniteScroll: boolean = false;
    @Input() scrollDelay: number = 100;
    @Input() scrollHeightDistanceFromBottom: number = 30;
    @Input() scrollHeight: string = '50vh';

    @Output() onScrollOnBottom: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
    iconeExpandir: string = "fa fa-angle-down";
    iconeRecolher: string = "fa fa-angle-up";
    textoExpandirTodos: string = "Expandir Todos";
    textoRecolherTodos: string = "Recolher Todos";
    textoExpandir: string = "Expandir";
    textoRecolher: string = "Recolher";

    private scrollTimeout;
    private previousScrollTop: number = 0;

    get filters() {
        return this.tt.filters;
    }
    set filters(value) {
        this.tt.filters = value;
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    @Output() onSort: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowExpand: EventEmitter<any> = new EventEmitter<any>();

    rowExpansionTemplate: TemplateRef<any>;

    @ViewChild(Table) tt: Table;

    templatesTabela: { [nome: string]: TemplateRef<any> } = {};

    ngOnInit(): void {
        $(document).ready(() => {
            $(".table-infiniteScroll .ui-table-scrollable-body").on("scroll", (obj) => {
                let el = obj.target;
                if ((this.previousScrollTop < el.scrollTop) && (el.scrollTop >= (el.scrollHeight - el.clientHeight) - this.scrollHeightDistanceFromBottom)) {
                        if (this.scrollTimeout) {
                            clearTimeout(this.scrollTimeout);
                        }
                        this.scrollTimeout = setTimeout(() => {
                            this.onScrollOnBottom.emit();
                            this.scrollTimeout = null;
                        }, this.scrollDelay);
                    }
                this.previousScrollTop = el.scrollTop;
            })
        });
    };

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'rowexpansion':
                    this.rowExpansionTemplate = item.template;
                    break;
                default:
                    this.templatesTabela[item.name] = item.template;
            }
        });
    }

    tableClass() {
        let classes = "table table-hover table-striped tablegreen table-rdo table-filter";
        if (this.infiniteScroll) {
            classes = classes + " table-infiniteScroll";
        }
        return classes;
    }

    onSortFn(event) {
        this.onSort.emit(event);
    }

    onFilterFn(event) {
        this.onFilter.emit(event);
        let filteredValue = [];

        if (!this.tt.hasFilter()) {
            this.tt.filteredValue = null;
        } else {
            for (let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let localFiltered = true;

                for (let prop in this.tt.filters) {
                    localFiltered = true;
                    let filterMeta = this.tt.filters[prop];
                    let filterField = prop;
                    let filterValue = filterMeta.value;
                    let filterMatchMode = filterMeta.matchMode || 'contains';
                    let dataFieldValue = this.tt.objectUtils.resolveFieldData(this.value[i], filterField);
                    let filterConstraint = this.tt.filterConstraints[filterMatchMode];

                    if (!filterConstraint(dataFieldValue, filterValue)) {
                        localMatch = false;
                    }

                    if (!localMatch) {
                        break;
                    }
                }
                let matches: boolean;
                matches = localFiltered && localMatch;

                if (matches) {
                    filteredValue.push(this.value[i]);
                }

                if (filteredValue.length === this.value.length) {
                    filteredValue = null;
                }
            }

            this.tt.filteredValue = filteredValue || this.value;
        }
    }

    filter(value: any, field: any, matchMode: any) {
        this.tt.filter(value, field, matchMode);
    }

    reset() {
        this.tt.reset();
    }

    getAllIconExpand() {
        if (this.isAllExpanded()) {
            return this.iconeRecolher;
        } else {
            return this.iconeExpandir;
        }

    }

    getAllTextExpand() {
        if (this.isAllExpanded()) {
            return this.textoRecolherTodos;
        } else {
            return this.textoExpandirTodos;
        }

    }


    isAllExpanded() {
        let allExpanded = true;
        if (this.value) {
            this.value.forEach(x => {
                if (!this.tt.isRowExpanded(x))
                    allExpanded = false;
            });
        }
        return allExpanded;
    }

    getRowIconExpanded(expanded) {
        return expanded ? this.iconeRecolher : this.iconeExpandir;
    }

    getRowTextExpanded(expanded) {
        return expanded ? this.textoRecolher : this.textoExpandir;
    }

    expandAll() {
        if (this.isAllExpanded()) {
            this.value.forEach(x => {
                this.tt.toggleRow(x);
            });
        } else {
            this.value.forEach(x => {
                if (!this.tt.isRowExpanded(x)) {
                    this.tt.toggleRow(x);
                }
            })
        }
    }

    sortSingle() {
        this.tt.sortSingle();
    }

    onRowExpandFn(event) {
        this.onRowExpand.emit(event);
    }

    onRowSelectFn(event) {
        this.onRowSelect.emit(event);
    }

}

export interface Coluna {
    header: string;
    field: string;
    filterable: boolean;
    sortable: boolean;
    customFilter;
    customSort;
    style: any;
    class: string;
    headerTemplateName: string;
    bodyTemplateName: string;
    filterTemplateName: string;
    filterMatchMode: string;
}
