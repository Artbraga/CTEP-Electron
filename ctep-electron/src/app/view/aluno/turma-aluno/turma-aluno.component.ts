import { Component, OnInit, Inject } from '@angular/core';
import { TurmaAluno } from '../../../../model/turma-aluno.model';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { CursoService } from '../../../../services/curso.service';
import { TurmaService } from '../../../../services/turma.service';
import { Curso } from '../../../../model/curso.model';
import { Turma } from '../../../../model/turma.model';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { AlunoService } from '../../../../services/aluno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from '../../../../model/aluno.model';

@Component({
    selector: 'app-turma-aluno',
    templateUrl: './turma-aluno.component.html',
    styleUrls: ['./turma-aluno.component.scss']
})
export class TurmaAlunoComponent extends BaseFormularioComponent<TurmaAluno> implements OnInit {
    cursosOptions: Curso[] = [];
    cursoSelecionado: Curso;

    turmasOptions: Turma[] = [];
    turmaSelecionada: Turma;
    matricula: string;

    constructor(private alunoService: AlunoService,
                private cursoService: CursoService,
                private turmaService: TurmaService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<TurmaAlunoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Aluno) {
        super(new TurmaAluno());
     }

    ngOnInit(): void {
        this.listarCursos();
    }

    validar(): boolean {
        let valido = true;
        if (this.cursoSelecionado == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Curso é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (this.turmaSelecionada == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Turma é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.stringValida(this.matricula)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Matrícula é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        return valido;
    }

    gerarMatricula() {
        const dataMatricula = new Date();
        this.alunoService.gerarNumeroDeMatricula(this.cursoSelecionado.id, dataMatricula.getFullYear()).subscribe(data => {
            this.matricula = data;
        });
    }

    listarCursos() {
        this.cursoService.listarCursos().subscribe(data => {
            this.cursosOptions = data.map(x => Object.assign(new Curso(), x));
        });
    }

    buscarTurmas() {
        this.turmaSelecionada = null;
        this.turmaService.buscarTurmasDeUmCurso(this.cursoSelecionado.id).subscribe(data => {
            this.turmasOptions = data.map(x => Object.assign(new Turma(), x));
        });
    }

    closeModal(salvar: boolean) {
        if (salvar && this.validar()) {
            const turmaAluno = new TurmaAluno();
            turmaAluno.turma = this.turmaSelecionada;
            turmaAluno.matricula = this.matricula;
            turmaAluno.alunoId = this.data.id;
            this.alunoService.vincularAlunoTurma(turmaAluno).subscribe(data => {
                if (data) {
                    this.notificationService.addNotification('Sucesso!', 'O aluno vinculado na turma com sucesso.', NotificationType.Success);
                    this.dialogRef.close();
                }
            });
        } else {
            this.dialogRef.close();
        }
    }
}
