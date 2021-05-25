import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IdTurmaParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { Turma } from '../../../../model/turma.model';
import { AlunoService } from '../../../../services/aluno.service';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { RoutingService } from '../../../../services/routing.service';
import { TurmaService } from '../../../../services/turma.service';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { Coluna } from '../../../custom-components/base-table';
import { NotificationService } from '../../../custom-components/notification/notification.service';

@Component({
    selector: 'app-notas-turma',
    templateUrl: './notas-turma.component.html',
    styleUrls: ['./notas-turma.component.scss']
})
export class NotasTurmaComponent extends BaseFormularioComponent<any> implements OnInit {

    turma: Turma;
    columns: Coluna[] = [];
    list: { [id: string]: string }[] = [];
    rotaVoltar: string = null;

    constructor(private alunoService: AlunoService,
                private turmaService: TurmaService,
                private disciplinaService: DisciplinaService,
                private routingService: RoutingService,
                private notificationService: NotificationService,
                private router: Router,
                ) {
        super(null);
    }

    ngOnInit(): void {
        this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
        const id = this.routingService.excluirValor(IdTurmaParameter) as number;
        this.turmaService.getById(id).subscribe(data => {
            this.turma = Object.assign(new Turma(), data);
            this.columns.push({ key: 'nome', header: 'Aluno', field: 'nomeAluno' } as Coluna);
            this.columns.push({ key: 'matricula', header: 'Matrícula', field: 'matricula' } as Coluna);
            forkJoin([
                this.disciplinaService.listarDisciplinasDeUmCurso(this.turma.curso.id),
                this.alunoService.buscarAlunosENotasDeTurma(this.turma.id)
            ]).subscribe(([disciplinas, alunos]) => {
                disciplinas.forEach(d => {
                    this.columns.push({ key: d.nome, header: d.nome, field: d.nome } as Coluna);
                });
                alunos.forEach(al => {
                    const obj: { [id: string]: string } = {};
                    obj['nomeAluno'] = al.nomeAluno;
                    obj['matricula'] = al.matricula;
                    disciplinas.forEach(d => {
                        const nota = al.notas.find(x => x.disciplinaId === d.id);
                        if (nota != null) {
                            obj[d.nome] = nota.valorNota.toString();
                        } else {
                            obj[d.nome] = '';
                        }
                    });
                    this.list.push(obj);
                });
            });
        });
    }

    salvar() {
        console.log(this.columns);
        console.log(this.list);
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    validar(): boolean {
        throw new Error('Method not implemented.');
    }
}
