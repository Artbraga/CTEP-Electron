import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { Boleto } from 'src/model/boleto.model';
import { FinanceiroService } from 'src/services/financeiro.service';
import { RoutingService } from 'src/services/routing.service';

@Component({
    selector: 'tabela-boleto',
    templateUrl: './tabela-boleto.component.html',
    styleUrls: ['./tabela-boleto.component.scss']
})
export class TabelaBoletoComponent extends BaseTable<Boleto> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();
    @Output() paginar = new EventEmitter<number>();

    constructor(public dialog: MatDialog,
        public financeiroService: FinanceiroService,
        public notificationService: NotificationService,
        private routingService: RoutingService,
        private router: Router) {
        super();
        this.pageList = new PageTableResult<Boleto>();
    }

    ngOnInit() {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'nome' } as Coluna);
        this.columns.push({ key: 'cpf', header: 'CPF', field: 'cpf' } as Coluna);
        this.columns.push({ key: 'telefone', header: 'Telefone', field: 'telefone' } as Coluna);
        this.columns.push({ key: 'celular', header: 'Celular', field: 'celular' } as Coluna);
        this.columns.push({ key: 'matricula', header: 'Matrículas', field: 'matriculas' } as Coluna);
        this.columns.push({ key: 'turmas', header: 'Turmas', field: 'turmas' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'tipoStatusAluno' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    paginacao(event: PageEvent) {
        this.paginar.emit(event.pageIndex);
    }
}
