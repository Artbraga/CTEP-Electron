import { OnInit, Component, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "src/app/base/base-formulario";
import { Turma } from "src/app/entities/turma";
import { TurmaService } from "src/app/service/turma.service";
import { CursoService } from "src/app/service/curso.service";
import { DisciplinaService } from "src/app/service/disciplina.service";
import { Curso } from "src/app/entities/curso";
import { Disciplina } from "src/app/entities/disciplina";
import { Coluna } from "src/app/components/table-x/table-x.component";
import { NotaAluno } from "src/app/entities/notaAluno";

@Component({
    selector: 'nota-disciplina',
    templateUrl: './nota-disciplina.component.html',
})
export class NotaDisciplinaComponent implements OnInit{
    
    cursoSuggestions: any[];
    turmaSuggestions: any[];
    disciplinaSuggestions: any[];

    cursoSelecionado: Curso;
    turmaSelecionada: Turma;
    disciplinaSelecionada: Disciplina;

    colunas: Coluna[];
    notas: NotaAluno[] = [];

    list: NotaAluno[];

    constructor(private turmaService: TurmaService,
        private cursoService: CursoService,
        private disciplinaService: DisciplinaService,
        ref: ChangeDetectorRef){
    }

    ngOnInit(){
        this.colunas = <Coluna[]>[
            { header: "Matrícula", field: "aluno.matricula", style: { 'width': '200px' } },
            { header: "Nome", field: "aluno.nome" },
            { header: "Nota", bodyTemplateName:"inputNota", style: { 'width': '200px'}}
        ];
    }

    buscarDropdown(busca, campo: string){
        let filter = busca.query;
        switch(campo){
            case "curso":
                this.cursoService.filtrar(filter).subscribe(data =>{
                    this.cursoSuggestions = data;
                });
                break;
            case "turma":
                this.turmaService.filtrarTurmasDeUmCurso(this.cursoSelecionado.id, filter).subscribe(data =>{
                    this.turmaSuggestions = data;
                });
                break;
            case "disciplina":
                this.disciplinaService.filtrarDisciplinasDeUmCurso(this.cursoSelecionado.id, filter).subscribe(data =>{
                    this.disciplinaSuggestions = data;
                });
                break;
        }
    }

    onSelect(campo: string){
        switch(campo){
            case "curso":
                this.turmaSelecionada = null;
                this.onSelect("turma");
                break;
            case "turma":
                this.disciplinaSelecionada = null;
                this.onSelect("disciplina");
                break;
            case "disciplina":
                break;
        }
    }

    limparCampos(){
        this.cursoSelecionado = null;
        this.disciplinaSelecionada = null;
        this.turmaSelecionada = null;
    }

    pesquisarNotasAlunos(){
        this.notas = [];
        this.turmaService.listarNotasDeUmaTurmaEDisciplina(this.turmaSelecionada.codigo, this.disciplinaSelecionada.id).subscribe(data =>{
            data.forEach(n =>{
                this.notas.push(Object.assign(new NotaAluno(), n));
            })
        });
    }

    getDisabled(campo: string){
        switch(campo){
            case "turma":
                return this.cursoSelecionado == null;
            case "disciplina":
                return this.turmaSelecionada == null;
        }
    }

    cadastrarNotas(){
        this.turmaService.salvarNotas(this.notas).subscribe();
    }
}
