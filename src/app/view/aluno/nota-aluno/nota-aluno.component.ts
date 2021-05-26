import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Aluno } from '../../../../model/aluno.model';
import { Disciplina } from '../../../../model/disciplina.model';
import { MaskPatterns } from '../../../../model/enums/mask.enum';
import { NotaAluno } from '../../../../model/nota-aluno.model';
import { Turma } from '../../../../model/turma.model';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { NotaAlunoService } from '../../../../services/nota-aluno.service';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';

@Component({
    selector: 'app-nota-aluno',
    templateUrl: './nota-aluno.component.html',
    styleUrls: ['./nota-aluno.component.scss']
})
export class NotaAlunoComponent implements OnInit {
    masks = MaskPatterns;

    notas: NotaAluno[] = [];
    disciplinas: Disciplina[];
    aluno: Aluno;
    turma: Turma;

    constructor(private notaAlunoService: NotaAlunoService,
                private disciplinaService: DisciplinaService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<NotaAlunoComponent>,
                @Inject(MAT_DIALOG_DATA) data: any) {
        this.aluno = data.aluno;
        this.turma = data.turma;
    }

    ngOnInit(): void {
        forkJoin([
            this.disciplinaService.listarDisciplinasDeUmCurso(this.turma.curso.id),
            this.notaAlunoService.listarNotasDeUmAluno(this.aluno.id)
        ]).subscribe(([disciplinas, notas]) => {
            this.disciplinas = disciplinas;
            this.disciplinas.forEach(d => {
                let nota = notas.find(x => x.disciplinaId === d.id);
                if (nota == null) {
                    nota = new NotaAluno();
                    nota.disciplina = d;
                    nota.disciplinaId = d.id;
                    nota.alunoId = this.aluno.id;
                } else {
                    nota.disciplina = d;
                    nota.valorNota = parseFloat(nota.valorNota.toString().replace(',', '.'));
                }
                this.notas.push(nota);
            });
        });
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (!this.validar(this.notas)) { return; }
            this.notaAlunoService.salvarNotas(this.notas).subscribe(data => {
                this.notificationService.addNotification('Sucesso!', 'Notas do aluno salvas com sucesso.', NotificationType.Success);
                this.dialogRef.close(true);
            });

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
                    this.notificationService.addNotification('Nota inválida!', `A nota da disciplina ${n.disciplina.nome} está no formato incorreto.`, NotificationType.Warnning);
                }
                if (nota < 0 || nota > 10) {
                    retorno = false;
                    this.notificationService.addNotification('Nota inválida!', `A nota da disciplina ${n.disciplina.nome} possui um valor inválido.`, NotificationType.Warnning);
                }
            }
        });
        return retorno;
    }
}
