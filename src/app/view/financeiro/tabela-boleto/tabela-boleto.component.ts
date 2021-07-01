import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { Boleto } from 'src/model/boleto.model';
import { FinanceiroService } from 'src/services/financeiro.service';
import { RoutingService } from 'src/services/routing.service';
import { AlterarSituacaoComponent } from '../alterar-situacao/alterar-situacao.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

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
        this.columns.push({ key: 'nome', header: 'Nome', field: 'aluno.nome' } as Coluna);
        this.columns.push({ key: 'seuNumero', header: 'Número', field: 'seuNumero' } as Coluna);
        this.columns.push({ key: 'vencimento', header: 'Vencimento', field: 'dataVencimentoStr' } as Coluna);
        this.columns.push({ key: 'valor', header: 'Valor', field: 'valorStr' } as Coluna);
        this.columns.push({ key: 'pagamento', header: 'Data do Pagamento', field: 'dataPagamentoStr' } as Coluna);
        this.columns.push({ key: 'valorPago', header: 'Valor Pago', field: 'valorPagoStr' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'status' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    paginacao(event: PageEvent) {
        this.paginar.emit(event.pageIndex);
    }

    calcular(boleto: Boleto) {
        this.dialog.open(CalculadoraComponent, {
            data: boleto,
            width: '50vw',
            panelClass: 'calculadora'
        });
    }

    alterarSituacao(boleto: Boleto) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja alterar a situação do boleto ${boleto.seuNumero}?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(AlterarSituacaoComponent, { data: boleto, width: '50vw' }).afterClosed().subscribe(res => {
                    if (result) this.pesquisar.emit();
                });
            }
        });
    }

}
