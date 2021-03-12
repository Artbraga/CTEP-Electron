import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Aluno } from 'src/model/aluno.model';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { MatDialog } from '@angular/material/dialog';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { AlunoService } from 'src/services/aluno.service';
import { FichaAlunoParameter, FormularioAlunoParameter, IdAlunoParameter, PesquisarAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { PageEvent } from '@angular/material/paginator';
import { PageTableResult } from '../../../custom-components/page-table-result';

@Component({
    selector: 'tabela-aluno',
    templateUrl: './tabela-aluno.component.html',
    styleUrls: ['./tabela-aluno.component.scss'],
})
export class TabelaAlunoComponent extends BaseTable<Aluno> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();
    @Output() paginar = new EventEmitter<number>();

    constructor(public dialog: MatDialog,
                public alunoService: AlunoService,
                public notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router) {
        super();
        this.pageList = new PageTableResult<Aluno>();
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

    visualizarAluno(element: Aluno) {
        this.routingService.salvarValor(IdAlunoParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, PesquisarAlunoParameter);
        this.router.navigate([{ outlets: { secondRouter: FichaAlunoParameter } }]);
    }

    editarAluno(element: Aluno) {
        this.routingService.salvarValor(IdAlunoParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, PesquisarAlunoParameter );
        this.router.navigate([{ outlets: { secondRouter: FormularioAlunoParameter } }]);
    }

    excluirAluno(element: Aluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir o aluno "${element.nome}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.deletar(element.id).subscribe(() => {
                    this.pesquisar.emit();
                });
            }
        });
    }

    paginacao(event: PageEvent) {
        this.paginar.emit(event.pageIndex);
    }
}
