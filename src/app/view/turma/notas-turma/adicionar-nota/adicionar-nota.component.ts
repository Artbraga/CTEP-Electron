import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { NotaAlunoService } from 'src/services/nota-aluno.service';
import { AlunoNotas } from '../../../../../model/aluno-notas.model';
import { Disciplina } from '../../../../../model/disciplina.model';
import { NotaAluno } from '../../../../../model/nota-aluno.model';
import { Professor } from '../../../../../model/professor.model';
import { ProfessorService } from '../../../../../services/professor.service';

interface IDataAdicionarNotas {
    alunos: AlunoNotas[];
    disciplinas: Disciplina[];
    turmaId: number;
}

@Component({
    selector: 'app-adicionar-nota',
    templateUrl: './adicionar-nota.component.html',
    styleUrls: ['./adicionar-nota.component.scss']
})
export class AdicionarNotaComponent implements OnInit {
    disciplinaSelecionada: Disciplina;
    professorOptions: Professor[];
    professorSelecionado: Professor;
    notas: NotaAluno[];

    constructor(private professorService: ProfessorService,
                private notaAlunoService: NotaAlunoService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<AdicionarNotaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IDataAdicionarNotas) { }

    ngOnInit(): void {
        this.professorService.listarProfessoresDaTurma(this.data.turmaId).subscribe(data => {
            this.professorOptions = data.map(x => Object.assign(new Professor(), x));
        });
    }

    listarNotasDaDisciplina() {
        this.notas = [];
        this.data.alunos.forEach(x => {
            const nota = new NotaAluno();
            nota.alunoId = x.alunoId;
            nota.disciplinaId = this.disciplinaSelecionada.id;
            nota.nomeAluno = x.nomeAluno;
            const notaSalva = x.notas.find(n => n.disciplinaId == this.disciplinaSelecionada.id);
            if (notaSalva != null) {
                nota.id = notaSalva.id;
                nota.valorNota = parseFloat(notaSalva.valorNota.toString().replace(',', '.'));
            }
            this.notas.push(nota);
        });
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar(this.notas)) {
                this.notaAlunoService.salvarNotas(this.notas).subscribe(data => {
                    this.notificationService.addNotification('Sucesso!', 'Notas da turma salvas com sucesso!', NotificationType.Success)
                    this.dialogRef.close(true);
                });
            }
        } else {
            this.dialogRef.close(false);
        }
    }

    validar(notas: NotaAluno[]): boolean {
        let retorno = true;
        notas.forEach(n  => {
            if (n.valorNota != null ) {
                const nota = n.valorNota;
                if (isNaN(nota)) {
                    retorno = false;
                    this.notificationService.addNotification('Nota inválida!', `A nota do aluno ${n.nomeAluno} está no formato incorreto.`, NotificationType.Warnning);
                }
                if (nota < 0 || nota > 10) {
                    retorno = false;
                    this.notificationService.addNotification('Nota inválida!', `A nota da disciplina ${n.nomeAluno} possui um valor inválido.`, NotificationType.Warnning);
                }
                if (this.professorSelecionado != null) {
                    n.professorId = this.professorSelecionado.id;
                }
            }
        });
        return retorno;
    }
}
