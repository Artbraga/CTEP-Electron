import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IdTurmaParameter } from '../../../../model/enums/constants';
import { Turma } from '../../../../model/turma.model';
import { AlunoService } from '../../../../services/aluno.service';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { RoutingService } from '../../../../services/routing.service';
import { TurmaService } from '../../../../services/turma.service';
import { NotificationService } from '../../../custom-components/notification/notification.service';

@Component({
    selector: 'app-notas-turma',
    templateUrl: './notas-turma.component.html',
    styleUrls: ['./notas-turma.component.scss']
})
export class NotasTurmaComponent implements OnInit {

    turma: Turma;

    constructor(private alunoService: AlunoService,
                private turmaService: TurmaService,
                private disciplinaService: DisciplinaService,
                private routingService: RoutingService,
                private notificationService: NotificationService,
                ) { }

    ngOnInit(): void {
        const id = this.routingService.excluirValor(IdTurmaParameter) as number;
        this.turmaService.getById(id).subscribe(data => {
            this.turma = Object.assign(new Turma(), data);
            forkJoin([
                this.disciplinaService.listarDisciplinasDeUmCurso(this.turma.curso.id),
                this.alunoService.buscarAlunosENotasDeTurma(this.turma.id)
            ]).subscribe(([disciplinas, alunos]) => {

            });
        });
    }
}
