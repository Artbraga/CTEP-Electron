import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Turma } from "src/app/entities/turma";
import { BaseFormulario } from "src/app/base/base-formulario";
import { TurmaService } from "src/app/service/turma.service";
import { CursoService } from "src/app/service/curso.service";
import { ObservacaoTurma } from "src/app/entities/observacaoTurma";
import { Professor } from "src/app/entities/professor";
import { ProfessorService } from "src/app/service/professor.service";
import { SelectItem } from "primeng/primeng";
import { elementAt } from "rxjs/operators";

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
    statusSelecionado: SelectItem;
    tentouAdicionarTurma: boolean = false;;

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
            {label: "Teoria", value:1 },
            {label: "Estágio", value:2 },
            {label: "Concluída", value:3 },
        ];

        this.professorService.listar().subscribe(data => {
            if(this.element.professores != null && this.element.professores.length > 0){
                this.professoresSelecionados = this.element.professores;   
            }
            this.todosProfessores = data.filter(x => !this.professoresSelecionados.some(p => p.nome == x.nome));
        });
        this.observacao = new ObservacaoTurma();

        if(this.element.status != null){
            this.statusSelecionado = this.statusOptions.find(x => x.value == this.element.status);
        }
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
        this.tentouAdicionarTurma = true;
        if (!this.validField(this.element.codigo) ||
            !this.validField(this.element.dataInicio) ||
            !this.validField(this.element.horaInicio) ||
            !this.validField(this.element.horaFim) ||
            !this.validField(this.element.diasDaSemana) ||
            !this.validField(this.element.curso) ||
            !this.validField(this.element.status)){
                return;
        }
        this.element.status = this.statusSelecionado.value;
        this.turmaService.salvar(this.element, () => {
            this.element = new Turma();
            this.showFeedbackMessage({ severity: 'success', summary: 'Sucesso!', detail: 'Turma cadastrada com sucesso!' });
            this.tentouAdicionarTurma = false;
            this.element = new Turma();
        },  
        (err) =>{
            this.showFeedbackMessage(err)
        });
    }

    public isCampoInvalido(campo: string): boolean{
        switch (campo) {
            case 'codigo':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.codigo));
            case 'dataInicio':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.dataInicio));
            case 'horaInicio':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.horaInicio));
            case 'horaFim':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.horaFim));
            case 'dia':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.diasDaSemana));
            case 'curso':
                return this.tentouAdicionarTurma && (this.element == null || !this.validField(this.element.curso));
        }
        return false;
    }

    onChange(campo: string, value){
        switch(campo){
            case "curso":
                this.element.codigo = "";
                break;
            case "situacao":
                if(value.value == 3)
                    this.element.dataFim = new Date();
                break;
        }
    }
}