import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from '../../../../model/aluno.model';
import { TipoStatusAlunoEnum } from '../../../../model/enums/tipo-status-aluno.enum';
import { FiltroTurma } from '../../../../model/filters/turma.filter';
import { TurmaAluno } from '../../../../model/turma-aluno.model';
import { Turma } from '../../../../model/turma.model';
import { AlunoService } from '../../../../services/aluno.service';
import { TurmaService } from '../../../../services/turma.service';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';

@Component({
    selector: 'app-transferencia-aluno',
    templateUrl: './transferencia-aluno.component.html',
    styleUrls: ['./transferencia-aluno.component.scss']
})
export class TransferenciaAlunoComponent extends BaseFormularioComponent<TurmaAluno> implements OnInit {
    turmasVinculadas: TurmaAluno[];
    turmaAtualSelecionada: TurmaAluno;
    turmaDesabilitada: boolean;
    turmasOptions: Turma[];
    turmaNovaSelecionada: Turma;

    constructor(private alunoService: AlunoService,
                private turmaService: TurmaService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<TurmaAlunoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Aluno) {
        super(new TurmaAluno());
    }

    ngOnInit(): void {
        this.turmasVinculadas = this.data.turmasAluno.filter(x => this.turmaAtiva(x));
        if (this.turmasVinculadas.length == 0) {
            this.notificationService.addNotification('Atenção', 'O aluno selecionado não está ativo em nenhuma turma.', NotificationType.Warnning);
            this.dialogRef.close(false);
        } else if (this.turmasVinculadas.length == 1) {
            this.turmaAtualSelecionada = this.turmasVinculadas[0];
            this.turmaDesabilitada = true;
            this.buscarTurmas();
        }
    }

    turmaAtiva(turmaAluno: TurmaAluno): boolean {
        return turmaAluno.tipoStatusAluno == TipoStatusAlunoEnum.Ativo.name;
    }

    buscarTurmas() {
        const filtro = new FiltroTurma();
        filtro.cursoId = this.turmaAtualSelecionada.turma.curso.id;
        filtro.concluidas = false;
        this.turmaService.pesquisarTurmas(filtro).subscribe(data => {
            this.turmasOptions = data.filter(x => x.codigo != this.turmaAtualSelecionada.turma.codigo);
        });
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.turmaAtualSelecionada.turma = this.turmaNovaSelecionada;
                this.turmaAtualSelecionada.alunoId = this.data.id;
                this.alunoService.vincularAlunoTurma(this.turmaAtualSelecionada).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'O aluno vinculado na turma com sucesso.', NotificationType.Success);
                        this.dialogRef.close(true);
                    }
                });
            }

        } else {
            this.dialogRef.close(false);
        }
    }

    validar(): boolean {
        let valido = true;
        if (this.turmaAtualSelecionada == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione uma turma que o aluno esteja vinculado.', NotificationType.Error);
        }
        if (this.turmaNovaSelecionada == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione uma turma nova para transferir o aluno.', NotificationType.Error);
        }
        return valido;
    }

}
