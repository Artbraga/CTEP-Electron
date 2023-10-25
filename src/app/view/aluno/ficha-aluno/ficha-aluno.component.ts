import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/model/aluno.model';
import { FichaAlunoRoute, FormularioAlunoRoute, HomeRoute, IdAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { NotaAlunoComponent } from '../nota-aluno/nota-aluno.component';
import { forkJoin } from 'rxjs';
import { NotaAluno } from '../../../../model/nota-aluno.model';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { NotaAlunoService } from '../../../../services/nota-aluno.service';
import { TipoStatusAlunoEnum } from '../../../../model/enums/tipo-status-aluno.enum';
import { BaixarArquivoService } from '../../../../services/application-services/baixarArquivo.service';

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
    columnsFinanceiro: Coluna[] = [];
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
    @ViewChild('turmaCrachaTemplate', { static: true }) turmaCrachaTemplate: TemplateRef<any>;
    turmaCrachaOptions: TurmaAluno[];
    turmaCrachaSelecionada: TurmaAluno;

    constructor(
        private alunoService: AlunoService,
        private notaAlunoService: NotaAlunoService,
        private disciplinaService: DisciplinaService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        private baixarArquivoService: BaixarArquivoService,
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

        this.columnsFinanceiro.push({
            key: "seuNumero",
            header: "Número",
            field: "seuNumero",
        } as Coluna);
        this.columnsFinanceiro.push({
            key: "vencimento",
            header: "Vencimento",
            field: "dataVencimentoStr",
        } as Coluna);
        this.columnsFinanceiro.push({
            key: "valor",
            header: "Valor",
            field: "valorStr",
        } as Coluna);
        this.columnsFinanceiro.push({
            key: "pagamento",
            header: "Data do Pagamento",
            field: "dataPagamentoStr",
        } as Coluna);
        this.columnsFinanceiro.push({
            key: "valorPago",
            header: "Valor Pago",
            field: "valorPagoStr",
        } as Coluna);
        this.columnsFinanceiro.push({
            key: "status",
            header: "Situação",
            field: "status",
        } as Coluna);

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
        if (this.rotaVoltar == HomeRoute) {
            this.router.navigate([{ outlets: { secondRouter: null } }])
            .then(() => this.router.navigate([this.rotaVoltar]));
        } else {
            this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
        }
    }

    tratarString(str: string, tst = null): string {
        if (tst) {
            console.log(tst);
            console.log(str);
        }
        if (str != null && str != '') {
            return str.toString();
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

    cracha() {
        let dialogRef: MatDialogRef<any, any>;
        this.turmaCrachaSelecionada = this.element.turmasAluno[0];
        if (this.element.turmasAluno.length > 1) {
            this.turmaCrachaOptions = this.element.turmasAluno;
            dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
                data: { mensagem: `Deseja gerar o crachá do aluno ${this.element.nome} para qual turma?`, template: this.turmaCrachaTemplate }
            });
        } else {
            dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
                data: { mensagem: `Deseja gerar o crachá do aluno ${this.element.nome}?` }
            });
        }
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.gerarCracha(this.turmaCrachaSelecionada.id).subscribe(data => {
                    if (data) {
                        this.baixarArquivoService.downloadFile(data, 'cracha.pdf', 'application/pdf');
                    }
                    this.turmaCrachaSelecionada = null;
                    this.turmaCrachaOptions = null;
                });
            }
        });
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

    concluido(turmaAluno: TurmaAluno): boolean {
        return turmaAluno.tipoStatusAluno == TipoStatusAlunoEnum.Concluido.name;
    }

    visualizarNotas(turmaAluno: TurmaAluno) {
        const dialogRef = this.dialog.open(NotaAlunoComponent,
            { width: '75vw', data: {
                aluno: this.element,
                turma: turmaAluno.turma
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) { this.carregarAluno(); }
        });
    }

    gerarHistorico(turmaAluno: TurmaAluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja gerar o histórico escolar de ${turmaAluno.turma.curso.nome} do aluno ${this.element.nome}?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.gerarHistorico(turmaAluno.id).subscribe(data => {
                    if (data) {
                        this.baixarArquivoService.downloadFile(data, `${this.element.nome}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                    }
                });
            }
        });
}

    editarAluno() {
        this.routingService.salvarValor(IdAlunoParameter, this.element.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaAlunoRoute );
        this.router.navigate([{ outlets: { secondRouter: FormularioAlunoRoute } }]);
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

    expandTable(element: TurmaAluno) {
        const index = this.element.turmasAluno.indexOf(element);
        if (this.expandedTurma.includes(element)) {
            this.expandedTurma = this.expandedTurma.filter(x => x !== element);
            this.changeIconTurma[index] = false;
        } else {
            this.expandedTurma = this.expandedTurma.concat([element]);
            this.changeIconTurma[index] = true;
            if (element.notas == null || element.notas.length == 0) {
                forkJoin([
                    this.disciplinaService.listarDisciplinasDeUmCurso(element.turma.curso.id),
                    this.notaAlunoService.listarNotasDeUmAluno(this.element.id)
                ]).subscribe(([disciplinas, notas]) => {
                    const notasCurso = [];
                    disciplinas.forEach(d => {
                        let nota = notas.find(x => x.disciplinaId === d.id);
                        if (nota == null) {
                            nota = new NotaAluno();
                            nota.disciplina = d;
                            nota.disciplinaId = d.id;
                        } else {
                            nota.disciplina = d;
                            nota.valorNota = parseFloat(nota.valorNota.toString().replace(',', '.'));
                        }
                        notasCurso.push(nota);
                    });
                    element.notas = notasCurso;
                });
            }
        }
    }
}
