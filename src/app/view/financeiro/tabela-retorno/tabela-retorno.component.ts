import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseTable, ColumnGroup, Coluna } from 'src/app/custom-components/base-table';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';

@Component({
    selector: 'tabela-retorno',
    templateUrl: './tabela-retorno.component.html',
    styleUrls: ['./tabela-retorno.component.scss']
})
export class TabelaRetornoComponent extends BaseTable<RetornoArquivo> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();
    @Output() paginar = new EventEmitter<number>();
    changeIconRetorno: boolean[] = [];
    colunas: Coluna[] = [];
    expandedRetornos: RetornoArquivo[] = [];
    columnGroups: ColumnGroup[] = [
        { keyGroup: 'table', groupHasBody: true, groupHasHeader: true },
        {
            keyGroup: 'expandGroupping',
            groupHasBody: true,
            groupHasHeader: false,
            groupBodyClass: 'detail-row'
        }
    ];
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.columns.push({ key: 'expand', groupKey: 'table', bodyTemplateName: 'expand' } as Coluna);
        this.columns.push({ key: 'numero', header: 'Número', field: 'numero' } as Coluna);
        this.columns.push({ key: 'expandedDetail', classBody: 'rowexpansion', colspan: 7, groupKey: 'expandGroupping', bodyTemplateName: 'expandedDetailTemplate' } as Coluna);
    }

    expandTable(element: RetornoArquivo) {
        const index = this.pageList.lista.indexOf(element);
        if (this.expandedRetornos.includes(element)) {
            this.expandedRetornos = this.expandedRetornos.filter(x => x !== element);
            this.changeIconRetorno[index] = false;
        } else {
            this.expandedRetornos = this.expandedRetornos.concat([element]);
            this.changeIconRetorno[index] = true;
        }
    }

    paginacao(event: PageEvent) {
        this.paginar.emit(event.pageIndex);
    }
}
