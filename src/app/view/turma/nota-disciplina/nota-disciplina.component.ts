import { OnInit, Component, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "src/app/base/baseFormulario";
import { Turma } from "src/app/entities/turma";
import { TurmaService } from "src/app/service/turma.service";
import { CursoService } from "src/app/service/curso.service";
import { DisciplinaService } from "src/app/service/disciplina.service";
import { Curso } from "src/app/entities/curso";
import { Disciplina } from "src/app/entities/disciplina";
import { Coluna } from "src/app/components/table-x/table-x.component";

@Component({
    selector: 'formulario-adiciona-turma',
    templateUrl: './formulario-adiciona-turma.component.html',
})
export class FormularioAdicionaTurmaComponent extends BaseFormulario<Turma> implements OnInit{
    
    cursoSuggestions: any[];
    turmaSuggestions: any[];
    disciplinaSuggestions: any[];

    cursoSelecionado: Curso;
    turmaSelecionada: Turma;
    disciplinaSelecionada: Disciplina;

    colunas: Coluna[];
    notas: {} = null;

    constructor(private turmaService: TurmaService,
        private cursoService: CursoService,
        private disciplinaService: DisciplinaService,
        ref: ChangeDetectorRef){
        super(turmaService, ref);
    }

    ngOnInit(){
        this.colunas = <Coluna[]>[
            { header: "Matrícula", field: "matricula", style: { 'width': '120px' } },
            { header: "Nome", field: "nome" },
            { header: "Nota", bodyTemplateName:"inputNota"}
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
                this.turmaService.filtrarTurmasPeloNome(filter).subscribe(data =>{
                    this.turmaSuggestions = data;
                });
                break;
            case "disciplina":
                this.disciplinaService.listarDisciplinasDeUmCurso(filter).subscribe(data =>{
                    this.disciplinaSuggestions = data;
                });
                break;
        }
    }

    limparCampos(){
        this.cursoSelecionado = null;
        this.disciplinaSelecionada = null;
        this.turmaSelecionada = null;
        this.updateView();
    }

    pesquisarNotasAlunos(){
    }

}
