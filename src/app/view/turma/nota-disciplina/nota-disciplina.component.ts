import { OnInit, Component, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "src/app/base/baseFormulario";
import { Turma } from "src/app/entities/turma";
import { TurmaService } from "src/app/service/turma.service";
import { CursoService } from "src/app/service/curso.service";
import { DisciplinaService } from "src/app/service/disciplina.service";
import { Curso } from "src/app/entities/curso";
import { Disciplina } from "src/app/entities/disciplina";

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
    disciplinaSelecionada: Disciplina

    constructor(private turmaService: TurmaService,
        private cursoService: CursoService,
        private disciplinaService: DisciplinaService,
        ref: ChangeDetectorRef){
        super(turmaService, ref);
    }

    ngOnInit(){

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

}
