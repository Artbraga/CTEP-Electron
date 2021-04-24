import { Component, OnInit } from '@angular/core';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { Turma } from '../../../../model/turma.model';
import { TurmaService } from '../../../../services/turma.service';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { Router } from '@angular/router';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { Curso } from '../../../../model/curso.model';
import { CursoService } from '../../../../services/curso.service';
import { MaskPatterns } from '../../../../model/enums/mask.enum';
import { RoutingService } from '../../../../services/routing.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroTurmaComponent } from '../registro-turma/registro-turma.component';
import { Coluna } from 'src/app/custom-components/base-table';
import { RegistroTurma } from 'src/model/registro-turma.model';
import { IdTurmaParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { FinalizarTurmaComponent } from '../finalizar-turma/finalizar-turma.component';

@Component({
    selector: 'app-formulario-turma',
    templateUrl: './formulario-turma.component.html',
    styleUrls: ['./formulario-turma.component.scss']
})
export class FormularioTurmaComponent extends BaseFormularioComponent<Turma> implements OnInit {

    masks = MaskPatterns;

    cursoSelecionado: Curso;
    cursosOptions: Curso[];

    columnsRegistro: Coluna[] = [];

    get emAndamento(): boolean {
        return this.element.status == 'Em Andamento';
    }

    constructor(private turmaService: TurmaService,
                private cursoService: CursoService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Turma());
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdTurmaParameter)) {
            this.isEdicao = true;
            this.id = this.routingService.excluirValor(IdTurmaParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.carregarTurma();

            this.columnsRegistro.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
            this.columnsRegistro.push({ key: 'registro', header: 'Registro', field: 'registro' } as Coluna);
            this.columnsRegistro.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
        } else {
            this.listarCursos();
        }
    }

    carregarTurma() {
        this.turmaService.getById(this.id).subscribe(data => {
            this.element = Object.assign(new Turma(), data);
            this.element.registros = this.element.registros.map(reg => {
                reg = Object.assign(new RegistroTurma(), reg);
                reg.ajustarDatas();
                return reg;
            });
            this.element.ajustarDatas();
            this.listarCursos();
        });
    }

    listarCursos() {
        this.cursoService.listarCursos().subscribe(data => {
            this.cursosOptions = data.map(x => Object.assign(new Curso(), x));
            if (this.element.curso != null) {
                this.cursoSelecionado = this.cursosOptions.find(x => x.id === this.element.curso.id);
            }
        });
    }

    validar(): boolean {
        let valida = true;
        if (this.cursoSelecionado == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário selecionar o curso ao aqual a turma será associada.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.codigo)) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o código da turma.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.diasDaSemana)) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o(s) dia(s) da semana da turma.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.horaInicio) || !this.stringValida(this.element.horaFim)) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o horário de início e fim da turma.', NotificationType.Error);
        }
        if (this.element.dataInicio == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher a data de início da turma.', NotificationType.Error);
        }
        return valida;
    }

    gerarCodigoDaTurma() {
        const ano = new Date(this.element.dataInicio).getFullYear();
        this.turmaService.gerarCodigoDaTurma(this.cursoSelecionado.id, ano).subscribe(data => {
            this.element.codigo = data;
        });
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    salvar() {
        if (this.validar()) {
            this.element.curso = this.cursoSelecionado;
            this.turmaService.salvar(this.element).subscribe(data => {
                if (data != null) {
                    if (this.element.id != null) {
                        this.voltar();
                    }
                    this.element = new Turma();
                    this.cursoSelecionado = null;
                    this.notificationService.addNotification('Sucesso!', 'A turma foi salva com sucesso.', NotificationType.Success);
                }
            });
        }
    }

    adicionarRegistro() {
        const dialogRef = this.dialog.open(RegistroTurmaComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.turmaService.adicionarRegistro(result).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro adicionado.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }

    excluirRegistro(registro: RegistroTurma) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja excluir o registro?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.turmaService.excluirRegistro(registro.id).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro excluído.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }

    finalizarTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja finalizar a turma ${this.element.codigo}?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(FinalizarTurmaComponent, { data: this.element }).afterClosed().subscribe(res => {
                    if (res) {
                        this.carregarTurma();
                    }
                });
            }
        });
    }

}
