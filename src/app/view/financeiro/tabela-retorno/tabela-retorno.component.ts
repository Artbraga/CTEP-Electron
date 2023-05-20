import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseTable, ColumnGroup, Coluna } from 'src/app/custom-components/base-table';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';

@Component({
    selector: 'tabela-retorno',
    templateUrl: './tabela-retorno.component.html',
    styleUrls: ['./tabela-retorno.component.scss'],
    animations: [
        trigger('detailExpand', [
            state(
                'collapsed',
                style({ height: '0px', minHeight: '0', display: 'none' })
            ),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
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
        this.columns.push({ key: 'numero', groupKey: 'table', header: 'Número', field: 'numero' } as Coluna);
        this.columns.push({ key: 'dataReferencia', groupKey: 'table', header: 'Data de Referência', field: 'dataReferenciaStr' } as Coluna);
        this.columns.push({ key: 'dataLeitura', groupKey: 'table', header: 'Data de Leitura', field: 'dataLeituraStr' } as Coluna);
        this.columns.push({ key: 'registros', groupKey: 'table', header: 'Nº de registros', field: 'registros.length' } as Coluna);
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
