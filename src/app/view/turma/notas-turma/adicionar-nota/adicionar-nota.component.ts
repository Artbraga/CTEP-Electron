import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoNotas } from '../../../../../model/aluno-notas.entity';
import { Disciplina } from '../../../../../model/disciplina.model';
import { NotaAluno } from '../../../../../model/nota-aluno.model';
import { Professor } from '../../../../../model/professor.model';
import { ProfessorService } from '../../../../../services/professor.service';

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
                private dialogRef: MatDialogRef<AdicionarNotaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { alunos: AlunoNotas[], disciplinas: Disciplina[] }) { }

    ngOnInit(): void {
        this.professorService.listarProfessoresAtivos().subscribe(data => {
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
                nota.valorNota = notaSalva.valorNota;
            }
            this.notas.push(nota);
        });
    }
}
