import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "../../../base/baseFormulario";
import { Aluno } from "../../../entities/aluno";
import { ViacepService } from '../../../service/ngx-viacep/viacep.service';
import { CepError, Endereco } from "../../../service/ngx-viacep/endereco";
import { Message } from "primeng/primeng";
import { CursoService } from "../../../service/curso.service";
import { AlunoService } from "../../../service/aluno.service";
import { TurmaService } from "../../../service/turma.service";
import { ObservacaoAluno } from "../../../entities/observacaoAluno";
import { Curso } from "../../../entities/curso";
import { Disciplina } from "../../../entities/disciplina";
import { Coluna } from "../../../components/table-x/table-x.component";
import { DisciplinaService } from "../../../service/disciplina.service";

@Component({
    selector: 'formulario-adiciona-aluno',
    templateUrl: './formulario-adiciona-aluno.component.html',
})
export class FormularioAdicionaAlunoComponent extends BaseFormulario<Aluno> implements OnInit{
    
    observacoesColumns: any[];
    //disciplinas: Disciplina[] = [];

    statusOptions: {label: string, value: any}[];

    cursoSuggestions: any[];
    turmaSuggestions: any[];
    situacaoSuggestions: any[];
    cursoEspecializacaoSuggestions: any[];
    turmaEspecializacaoSuggestions: any[];

    observacao: ObservacaoAluno;
    tentouAdicionarAluno: boolean = false;
    inserirEspecializacao: boolean = false;
    cursoEspecializacao: Curso = null;

    colunasObservacoes: Coluna[] = <Coluna[]>[
        { header: "Data", field: "dataStr", sortable: true, style:{'width':'100px'} },
        { header: "Observação", field: "obs", sortable: true },
        { bodyTemplateName: "editarObservacao", style:{'width':'50px'} },
        { bodyTemplateName: "excluirObservacao", style:{'width':'50px'} },
    ];
    observacaoDelete: ObservacaoAluno = null;
    displayObservacaoDelete: boolean = false;
    idEdicaoObservacao: number;

    disciplinas: Disciplina[] = [];
    disciplinasEspecializacao: Disciplina[] = [];

    constructor(private viacep: ViacepService,
                private alunoService: AlunoService,
                private cursoService: CursoService,
                private turmaService: TurmaService,
                private disciplinaService: DisciplinaService,
                ref: ChangeDetectorRef){
        super(alunoService, ref);
    }

    ngOnInit(){
        if (this.element == null)
            this.element = new Aluno();
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

        this.observacao = new ObservacaoAluno();
    }

    public buscarCEP(){
        this.loading = 1;
        this.viacep.buscarPorCep(this.element.cep).then(end => {
            this.loading = 0;
            if(!end.hasOwnProperty("erro")){
                let endereco = <Endereco> end;
                this.element.bairro = endereco.bairro;
                this.element.cidade = endereco.localidade;
                this.element.endereco = endereco.logradouro;
                this.showFeedbackMessage({ severity:'success', summary:'Endereço encontrado', detail:'Endereço encontrado com sucesso!' })
                this.updateView();
            }
            else{
                this.element.bairro = null;
                this.element.cidade = null;
                this.element.endereco = null;
                this.showFeedbackMessage({ severity:'error', summary:'CEP Incorreto', detail:'Endereço não encontrado para o CEP digitado.' });
            }
        }).catch( (error: CepError) => {
            this.showFeedbackMessage({ severity:'error', summary:'CEP Incorreto', detail:'Endereço não encontrado para o CEP digitado.' });
        });
    }

    public desabilitarBotaoBuscaCep(){
        return !/^[0-9]{8}$/.test(this.element.cep);
    }

    public desabilitarBotaoGerarMatriucla(){
        return !(this.validField(this.element.curso) && this.validField(this.element.anoMatricula));
    }

    public buscarDropdown(busca, campo: string){
        let filter = busca.query;
        switch(campo){
            case "curso":
                this.cursoService.filtrar(filter).subscribe(data =>{
                    this.cursoSuggestions = data;
                });
                break;
            case "turma":
                this.turmaService.filtrarTurmasDeUmCurso(this.element.curso.id, filter).subscribe(data =>{
                    this.turmaSuggestions = data;
                });
                break;
            case "situação":
                this.situacaoSuggestions = this.statusOptions.filter(x => x.label.toLowerCase().includes(filter.toLowerCase()))
                break;
            case "cursoEspecialização":
                this.cursoEspecializacaoSuggestions = this.element.curso.especializacoes.filter(x => x.nome.toLowerCase().includes(filter.toLowerCase()))
                break;
            case "turmaEspecialização":
                this.turmaService.filtrarTurmasDeUmCurso(this.cursoEspecializacao.id, filter).subscribe( data =>{
                    this.turmaEspecializacaoSuggestions = data;
                });
                break;
        }
    }

    public getDisabled(campo: string){
        switch (campo){
            case "turma":
                return this.element.curso == null || this.element.curso.id == null;
            case "turmaEspecializacao":
                return this.cursoEspecializacao == null || this.cursoEspecializacao.id == null;
        }
    }

    public onSelect(campo: string){
        switch (campo){
            case "dataMatricula":
                var data = this.element.dataMatricula;
                this.element.anoMatricula = data.getFullYear() % 100;
                break;
            case "curso":
                this.disciplinaService.listarDisciplinasDeUmCurso(this.element.curso.id).subscribe(data => {
                    this.disciplinas = data;
                    this.updateView();
                });
                this.cursoService.listarCursosDeEspecializacao(this.element.curso.id).subscribe(data => {
                    this.element.curso.especializacoes = data;
                })
                break;
            case "cursoEspecialização":
                this.disciplinaService.listarDisciplinasDeUmCurso(this.cursoEspecializacao.id).subscribe(data => {
                    this.disciplinasEspecializacao = data;
                    this.updateView();
                });
                break;
        }
    }

    public onChangeChkEspecializacao(selected: boolean){
        if(!selected){
            this.cursoEspecializacao = null;
            this.disciplinasEspecializacao = [];
        }
    }

    public gerarMatricula(){
        this.loading = 1;
        this.updateView();
        this.alunoService.gerarMatricula(this.element.anoMatricula, this.element.curso.id).subscribe(matricula => {
            this.element.matricula = matricula.data;
            this.loading = 0;
            this.updateView();
        })
    }

    public limparCampos(){
        this.element = new Aluno();
        this.cursoEspecializacao = null;
        this.inserirEspecializacao = false;
        
        this.limparObservacao();
        this.updateView();
    }

    public limparObservacao(){
        this.observacao = new ObservacaoAluno();
        this.idEdicaoObservacao= null;
        this.updateView();
    }

    public adicionarObservacao(){
        if(this.idEdicaoObservacao == null){
            this.element.observacoes.push(this.observacao);
        }
        else{
            this.element.observacoes[this.idEdicaoObservacao] = this.observacao;
            this.idEdicaoObservacao = null;
        }
        this.limparObservacao();
    }

    public cadastrarAluno(){
        this.tentouAdicionarAluno = true;
        if (!this.validField(this.element.nome) ||
            !this.validField(this.element.cpf) ||
            !this.validField(this.element.matricula) ||
            !this.validField(this.element.endereco) ||
            !this.validField(this.element.cep) ||
            !this.validField(this.element.dataMatricula) ||
            !this.validField(this.element.curso) ||
            !this.validField(this.element.status) ||
            !this.validField(this.element.rg)){
                return;
        }
        this.alunoService.salvar(this.element, ()=>{
            if(this.element.edicao){
                this.showFeedbackMessage({ severity: 'success', summary: 'Sucesso!', detail: 'Aluno editado com sucesso!' });
            }
            else{
                this.showFeedbackMessage({ severity: 'success', summary: 'Sucesso!', detail: 'Aluno cadastrado com sucesso!' });
            }
            this.tentouAdicionarAluno = false;
            this.limparCampos();
        }, (erro) =>{
            this.showFeedbackMessage(erro);
        });
    }

    public isCampoInvalido(campo: string): boolean{
        switch (campo) {
            case 'nome':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.nome));
            case 'cpf':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.cpf));
            case 'matricula':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.matricula));
            case 'endereco':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.endereco));
            case 'cep':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.cep));
            case 'dataMatricula':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.dataMatricula));
            case 'curso':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.curso));
            case 'status':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.status));
            case 'rg':
                return this.tentouAdicionarAluno && (this.element == null || !this.validField(this.element.rg));
        }
        return false;
    }

    public showConfirmationDeleteObservacao(item: ObservacaoAluno){
        this.displayObservacaoDelete = true;
        this.observacaoDelete = item;
        this.updateView();
    }

    public deleteObservacao(){
        let index = this.element.observacoes.findIndex(x => x.id == this.observacaoDelete.id && x.obs == this.observacaoDelete.obs && x.data == this.observacaoDelete.data)
        if(index != -1)
            this.element.observacoes.splice(index, 1);
        this.observacaoDelete = null;
        this.displayObservacaoDelete = false;
        this.updateView();
    }

    public editarObservacao(item: ObservacaoAluno, index: number): void{
        this.observacao = item;
        this.idEdicaoObservacao = index;
    }
}
