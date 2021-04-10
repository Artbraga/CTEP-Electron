import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/model/aluno.model';
import { FichaAlunoParameter, FormularioAlunoParameter, IdAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';
import { ColumnGroup, Coluna } from 'src/app/custom-components/base-table';
import { RegistroAlunoComponent } from '../registro-aluno/registro-aluno.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { RegistroAluno } from 'src/model/registro-aluno.model';
import { TransferenciaAlunoComponent } from '../transferencia-aluno/transferencia-aluno.component';
import { PrintTabDirective } from 'src/directives/printTabsDirective.directive';
import { AlteracaoSituacaoComponent } from '../alteracao-situacao/alteracao-situacao.component';
import { TurmaAluno } from 'src/model/turma-aluno.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ficha-aluno',
    templateUrl: './ficha-aluno.component.html',
    styleUrls: ['./ficha-aluno.component.scss'],
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
export class FichaAlunoComponent implements OnInit {
    rotaVoltar: string;
    element: Aluno;
    imagem: any;
    columnsRegistro: Coluna[] = [];
    columnsTurma: Coluna[] = [];
    expandedTurma: TurmaAluno[] = [];
    changeIconTurma: boolean[] = [];
    columnGroupsTurma: ColumnGroup[] = [
        { keyGroup: 'table', groupHasBody: true, groupHasHeader: true },
        {
            keyGroup: 'expandGroupping',
            groupHasBody: true,
            groupHasHeader: false,
            groupBodyClass: 'detail-row'
        }
    ];

    idAluno: number;

    @ViewChildren(PrintTabDirective) tab;

    constructor(
        private alunoService: AlunoService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        private router: Router,
        public dialog: MatDialog) {
        this.element = new Aluno();
        this.columnsRegistro.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
        this.columnsRegistro.push({ key: 'registro', header: 'Registro', field: 'registro', addTooltip: true, tooltipMinSize: 150 } as Coluna);
        this.columnsRegistro.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        this.columnsTurma.push({ key: 'expand', groupKey: 'table', bodyTemplateName: 'expand' } as Coluna);
        this.columnsTurma.push({ key: 'curso', header: 'Curso', groupKey: 'table', field: 'turma.curso.nome' } as Coluna);
        this.columnsTurma.push({ key: 'turma', header: 'Turma', groupKey: 'table', field: 'turma.codigo' } as Coluna);
        this.columnsTurma.push({ key: 'horario', header: 'Turma', groupKey: 'table', field: 'turma.horarioCompleto' } as Coluna);
        this.columnsTurma.push({ key: 'matricula', header: 'Matricula', groupKey: 'table', field: 'matricula' } as Coluna);
        this.columnsTurma.push({ key: 'status', header: 'Situação', groupKey: 'table', field: 'tipoStatusAluno' } as Coluna);
        this.columnsTurma.push({ key: 'buttons', groupKey: 'table', bodyTemplateName: 'acoesTemplate' } as Coluna);
        this.columnsTurma.push({ key: 'expandedDetail', classBody: 'rowexpansion', colspan: 7, groupKey: 'expandGroupping', bodyTemplateName: 'expandedDetailTemplate' } as Coluna);
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdAlunoParameter)) {
            this.idAluno = this.routingService.excluirValor(IdAlunoParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.carregarAluno();
            this.alunoService.buscarImagem(this.idAluno).subscribe(data => {
                if (data != null && data.size > 0) {
                    const blob = new Blob([data], { type: 'image/png' });
                    const reader = new FileReader();

                    reader.addEventListener('load', (event: any) => {
                        this.imagem = event.target.result;
                    });
                    reader.readAsDataURL(blob);
                }
            });
        }
    }

    carregarAluno() {
        this.alunoService.getById(this.idAluno).subscribe((data) => {
            this.element = Object.assign(new Aluno(), data);
            this.element.corrigirInformacoes();
        });
        this.expandedTurma = [];
        this.changeIconTurma = [];
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    tratarString(str: string): string {
        if (str != null && str.length > 0) {
            return str;
        }
        return '---';
    }

    getCampo(campo: string, aluno: Aluno): string {
        if (aluno != null) {
            switch (campo) {
                case 'sexo':
                    return aluno.sexo === 'm' ? 'Masculino' : 'Feminino';
            }
        }
        return '---';
    }

    vincularTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja vincular o aluno ${this.element.nome} em uma turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TurmaAlunoComponent, { data: this.element }).afterClosed().subscribe(res => {
                    this.carregarAluno();
                });
            }
        });
    }

    imprimir() {
        this.tab.first.print();
    }

    transferirTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja transferir o aluno ${this.element.nome} de turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TransferenciaAlunoComponent, { data: this.element }).afterClosed().subscribe(res => {
                    this.carregarAluno();
                });
            }
        });
    }

    alterarSituacao() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja alterar a situação do aluno ${this.element.nome}?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(AlteracaoSituacaoComponent, { data: this.element }).afterClosed().subscribe(res => {
                    this.carregarAluno();
                });
            }
        });
    }

    editarAluno() {
        this.routingService.salvarValor(IdAlunoParameter, this.element.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaAlunoParameter );
        this.router.navigate([{ outlets: { secondRouter: FormularioAlunoParameter } }]);
    }

    adicionarRegistro() {
        const dialogRef = this.dialog.open(RegistroAlunoComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.alunoService.adicionarRegistro(result).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro adicionado.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }

    excluirRegistro(registro: RegistroAluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja excluir o registro?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.excluirRegistro(registro.id).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro excluído.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }

    expandTable(element) {
        const index = this.element.turmasAluno.indexOf(element);
        if (this.expandedTurma.includes(element)) {
            this.expandedTurma = this.expandedTurma.filter(x => x !== element);
            this.changeIconTurma[index] = false;
        } else {
            this.expandedTurma = this.expandedTurma.concat([element]);
            this.changeIconTurma[index] = true;
        }
    }
}
