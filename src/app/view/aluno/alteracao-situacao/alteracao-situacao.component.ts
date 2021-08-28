import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from '../../../../model/aluno.model';
import { TipoStatusAlunoEnum } from '../../../../model/enums/tipo-status-aluno.enum';
import { MudancaSituacao } from '../../../../model/mudanca-situacao.model';
import { TurmaAluno } from '../../../../model/turma-aluno.model';
import { AlunoService } from '../../../../services/aluno.service';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { SelectItem } from '../../../custom-components/custom-select/custom-select.component';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';

@Component({
    selector: 'app-alteracao-situacao',
    templateUrl: './alteracao-situacao.component.html',
    styleUrls: ['./alteracao-situacao.component.scss']
})
export class AlteracaoSituacaoComponent extends BaseFormularioComponent<MudancaSituacao> implements OnInit {

    turmasVinculadas: TurmaAluno[];
    turmaAtualSelecionada: TurmaAluno;
    turmaDesabilitada: boolean;
    tiposStatusAlunoOptions: SelectItem<number>[];
    tiposStatusAlunoSelecionado: SelectItem<number>;

    constructor(private alunoService: AlunoService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<TurmaAlunoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Aluno) {
        super(new MudancaSituacao());
    }

    ngOnInit(): void {
        this.tiposStatusAlunoOptions = TipoStatusAlunoEnum.List();
        this.turmasVinculadas = this.data.turmasAluno.filter(x => !this.turmaConcluida(x));
        if (this.turmasVinculadas.length == 0) {
            this.notificationService.addNotification('Atenção', 'O aluno selecionado não possui turmas disponíveis para mudança de situação.', NotificationType.Warnning);
            this.dialogRef.close(false);
        } else if (this.turmasVinculadas.length == 1) {
            this.turmaAtualSelecionada = this.turmasVinculadas[0];
            this.turmaDesabilitada = true;
            this.buscarStatus();
        }
    }

    turmaConcluida(turmaAluno: TurmaAluno): boolean {
        return turmaAluno.tipoStatusAluno == TipoStatusAlunoEnum.Concluido.name;
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.element.turmaId = this.turmaAtualSelecionada.turma.id;
                this.element.alunoId = this.data.id;
                this.element.situacaoId = this.tiposStatusAlunoSelecionado.value;
                if (!this.ehConclusao()) {
                    this.element.codigoSistec = null;
                    this.element.dataConclusao = null;
                }
                this.alunoService.alterarSituacao(this.element).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Situação do aluno alterada com sucesso.', NotificationType.Success);
                        this.dialogRef.close(true);
                    }
                });
            }
        } else {
            this.dialogRef.close(false);
        }
    }

    buscarStatus() {
        this.tiposStatusAlunoSelecionado = null;
        switch (this.turmaAtualSelecionada.tipoStatusAluno) {
            case TipoStatusAlunoEnum.Ativo.name : {
                this.tiposStatusAlunoOptions = [
                    TipoStatusAlunoEnum.Concluido,
                    TipoStatusAlunoEnum.Trancado,
                    TipoStatusAlunoEnum.Abandono
                ];
                break;
            }
            case TipoStatusAlunoEnum.Trancado.name : {
                this.tiposStatusAlunoOptions = [
                    TipoStatusAlunoEnum.Ativo
                ];
                break;
            }
            case TipoStatusAlunoEnum.Abandono.name : {
                this.tiposStatusAlunoOptions = [
                    TipoStatusAlunoEnum.Ativo
                ];
                break;
            }
        }
    }

    ehConclusao() {
        return this.tiposStatusAlunoSelecionado == TipoStatusAlunoEnum.Concluido;
    }

    validar(): boolean {
        let valido = true;
        if (this.turmaAtualSelecionada == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione uma turma que o aluno esteja vinculado.', NotificationType.Error);
        }
        if (this.tiposStatusAlunoSelecionado == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione um status novo para o aluno.', NotificationType.Error);
        }
        if (this.ehConclusao() && this.element.dataConclusao == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Informe a data de conclusão.', NotificationType.Error);
        }
        return valido;
    }
}
