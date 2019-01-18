import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Turma } from "src/app/entities/turma";
import { BaseFormulario } from "src/app/base/base-formulario";
import { TurmaService } from "src/app/service/turma.service";
import { CursoService } from "src/app/service/curso.service";
import { ObservacaoTurma } from "src/app/entities/observacaoTurma";
import { Professor } from "src/app/entities/professor";
import { ProfessorService } from "src/app/service/professor.service";

@Component({
    selector: 'formulario-adiciona-turma',
    templateUrl: './formulario-adiciona-turma.component.html',
})
export class FormularioAdicionaTurmaComponent extends BaseFormulario<Turma> implements OnInit{

    observacoesColumns: any[];

    cursoSuggestions: any[];
    situacaoSuggestions: any[];
    statusOptions: {label: string, value: any}[];

    observacao: ObservacaoTurma;

    todosProfessores: Professor[] = [];
    professoresSelecionados: Professor[] = [];

    constructor(private turmaService: TurmaService,
                private cursoService: CursoService,
                private professorService: ProfessorService,
                ref: ChangeDetectorRef){
        super(turmaService, ref);
    }
    
    ngOnInit(){
        if (this.element == null)
            this.element = new Turma();
        this.observacoesColumns = [
            { field: 'data', header: 'Data', style: {'width':'20vw'}},
            { field: 'obs', header: 'Observação'},
        ];
        this.statusOptions = [
            {label: "Ativo", value:1 },
            {label: "Trancado", value:2 },
            {label: "Reprovado", value:3 },
            {label: "Concluído", value:4 },
        ];

        this.professorService.listar().subscribe(data => {
            if(this.element.professores != null && this.element.professores.length > 0){
                this.professoresSelecionados = this.element.professores;   
            }
            this.todosProfessores = data.filter(x => !this.professoresSelecionados.some(p => p.nome == x.nome));
        });
        this.observacao = new ObservacaoTurma();
    }

    buscarDropdown(busca, campo: string){
        let filter = busca.query;
        switch(campo){
            case "curso":
                this.cursoService.filtrar(filter).subscribe(data =>{
                    this.cursoSuggestions = data;
                });
                break;
            case "situação":
                this.situacaoSuggestions = this.statusOptions.filter(x => x.label.toLowerCase().includes(filter.toLowerCase()))
                break;
        }
    }

    gerarCodigo(){
        let ano = this.element.dataInicio == null ? new Date().getFullYear() : this.element.anoInicio;
        this.turmaService.gerarCodigo(ano, this.element.curso.id).subscribe(data => {
            this.element.codigo = data.data;
        })
    }

    desabilitarBotaoCodigo(){
        return this.element.curso == null;
    }

    onSelect(campo: string){
        switch (campo){
            case "dataInicio":
                var data = this.element.dataInicio;
                this.element.anoInicio = data.getFullYear() % 100;
                break;
        }
        
    }

    adicionarObservacao(){
        this.element.observacoes.push(this.observacao);
        this.limparObservacao();
    }

    limparObservacao(){
        this.observacao = new ObservacaoTurma();
        this.updateView();
    }

    cadastrarTurma(){

    }
}