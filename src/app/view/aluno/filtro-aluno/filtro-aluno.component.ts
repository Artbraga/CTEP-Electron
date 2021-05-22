import { Component, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { CursoService } from 'src/services/curso.service';
import { TurmaService } from 'src/services/turma.service';
import { Curso } from 'src/model/curso.model';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { SelectItem } from 'src/app/custom-components/custom-select/custom-select.component';
import { Turma } from 'src/model/turma.model';
import { TipoStatusAlunoEnum } from 'src/model/enums/tipo-status-aluno.enum';

@Component({
    selector: 'filtro-aluno',
    templateUrl: './filtro-aluno.component.html',
    styleUrls: ['./filtro-aluno.component.scss'],
})
export class FiltroAlunoComponent implements AfterViewInit {
    masks = MaskPatterns;

    @Output() pesquisar = new EventEmitter<FiltroAluno>();

    @Input() filtro: FiltroAluno;

    cursosOptions: Curso[];
    cursoSelecionado: Curso;

    turmasOptions: Turma[];
    turmaSelecionada: Turma;

    tiposStatusAlunoOptions: SelectItem<number>[];
    tiposStatusAlunoSelecionados: SelectItem<number>[];

    constructor(
        private cursoService: CursoService,
        private turmaService: TurmaService
    ) {}

    ngAfterViewInit(): void {
        this.tiposStatusAlunoOptions = TipoStatusAlunoEnum.List();
        this.listarCursos();
        if (this.filtro.codigoTurma != null) {
            this.pesquisarTurmas(this.filtro.codigoTurma);
        }
        if (this.filtro.situacaoId != null) {
            this.tiposStatusAlunoSelecionados = this.tiposStatusAlunoOptions.filter(x => this.filtro.situacaoId.includes(x.value));
        } else {
            this.tiposStatusAlunoSelecionados = [TipoStatusAlunoEnum.Ativo];
        }
    }

    listarCursos() {
        this.cursoService.listarCursos().subscribe((data) => {
            this.cursosOptions = data.map((x) => Object.assign(new Curso(), x));
            if (this.filtro.cursoId != null) {
                this.cursoSelecionado = this.cursosOptions.find(x => x.id = this.filtro.cursoId);
            }
        });
    }

    pesquisarAlunos() {
        if (this.cursoSelecionado != null) {
            this.filtro.cursoId = this.cursoSelecionado.id;
        }
        if (this.turmaSelecionada != null) {
            this.filtro.codigoTurma = this.turmaSelecionada.codigo;
        } else {
            this.filtro.codigoTurma = null;
        }
        this.filtro.situacaoId = this.tiposStatusAlunoSelecionados.map(x => x.value);
        this.pesquisar.emit(this.filtro);
    }

    pesquisarTurmas(value: string) {
        const cursoId = this.cursoSelecionado != null ? this.cursoSelecionado.id : null;
        this.turmaService.buscarTurmasPorCodigoECurso(value, cursoId).subscribe((data) => {
            this.turmasOptions = data.map((x) => Object.assign(new Turma(), x));
            if (this.turmasOptions.length == 1) {
                this.turmaSelecionada = this.turmasOptions[0];
                this.turmaSelected();
            }
        });
    }

    cursoSelected() {
        if (this.turmaSelecionada != null && this.turmaSelecionada.curso.id != this.cursoSelecionado.id) {
            this.turmaSelecionada = null;
        }
    }

    turmaSelected() {
        this.cursoSelecionado = this.cursosOptions.find(x => x.id === this.turmaSelecionada.curso.id);
    }

    limpar() {
        this.filtro = new FiltroAluno();
        this.tiposStatusAlunoSelecionados = [TipoStatusAlunoEnum.Ativo];
        this.cursoSelecionado = null;
        this.turmaSelecionada = null;
    }
}
