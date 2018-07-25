import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "src/app/base/baseFormulario";
import { Aluno } from "src/app/entities/aluno";
import { ViacepService } from 'src/app/service/ngx-viacep/viacep.service';
import { CepError, Endereco } from "src/app/service/ngx-viacep/endereco";
import { Message } from "primeng/primeng";
import { CursoService } from "src/app/service/curso.service";
import { AlunoService } from "src/app/service/aluno.service";
import { TurmaService } from "src/app/service/turma.service";
import { ObservacaoAluno } from "src/app/entities/observacaoAluno";

@Component({
    selector: 'formulario-adiciona-aluno',
    templateUrl: './formulario-adiciona-aluno.component.html',
})
export class FormularioAdicionaAlunoComponent extends BaseFormulario<Aluno> implements OnInit{
    
    observacoesColumns: any[];

    statusOptions: {label: string, value: any}[];

    cursoSuggestions: any[];
    turmaSuggestions: any[];
    situacaoSuggestions: any[];

    observacao: ObservacaoAluno;

    constructor(private viacep: ViacepService,
                private alunoService: AlunoService,
                private cursoService: CursoService,
                private turmaService: TurmaService,
                ref: ChangeDetectorRef){
        super(ref);
    }
    ngOnInit(){
        if (this.element == null)
            this.element = new Aluno();
        this.observacoesColumns = [
            { field: 'data', header: 'Data', style: {'width':'100px'}},
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

    buscarCEP(){
        this.loading = 1;
        this.viacep.buscarPorCep(this.element.cep).then(end => {
            this.loading = 0;
            if(!end.hasOwnProperty("erro")){
                let endereco = <Endereco> end;
                this.element.bairro = endereco.bairro;
                this.element.cidade = endereco.localidade;
                this.element.endereco = endereco.logradouro;
                this.showMessage({severity:'success', summary:'Endereo encontrado', detail:'Endereço encontrado com sucesso!'})
                this.updateView();
            }
            else{
                this.element.bairro = null;
                this.element.cidade = null;
                this.element.endereco = null;
                this.showMessage({severity:'error', summary:'CEP Incorreto', detail:'Endereço não encontrado para o CEP digitado.'});
            }
        }).catch( (error: CepError) => {
            this.showMessage({severity:'error', summary:'CEP Incorreto', detail:'Endereço não encontrado para o CEP digitado.'});
        });
    }

    desabilitarBotaoBuscaCep(){
        return !/^[0-9]{8}$/.test(this.element.cep);
    }

    desabilitarBotaoGerarMatriucla(){
        return !(this.validField(this.element.curso) && this.validField(this.element.anoMatricula));
    }

    showMessage(msg: Message){
        console.log(msg);
        this.msgs.push(msg);
        this.updateView();  
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
                this.turmaService.getTurmasDropdown(filter).subscribe(data =>{
                    this.turmaSuggestions = data;
                });
                break;
            case "situação":
                this.situacaoSuggestions = this.statusOptions.filter(x => x.label.toLowerCase().includes(filter.toLowerCase()))
                break;
        }
    }

    onSelect(campo: string){
        switch (campo){
            case "dataMatricula":
                var data = this.element.dataMatricula;
                this.element.anoMatricula = data.getFullYear() % 100;
                break;
        }
        
    }

    gerarMatricula(){
        this.loading = 1;
        this.updateView();
        this.alunoService.gerarMatricula(this.element.anoMatricula, this.element.curso.id).subscribe(matricula => {
            this.element.matricula = matricula.data;
            this.loading = 0;
            this.updateView();
        })
    }

    limparObservacao(){
        this.observacao = new ObservacaoAluno();
        this.updateView();
    }

    adicionarObservacao(){
        this.element.observacoes.push(this.observacao);
        this.limparObservacao();
    }

    cadastrarAluno(){

    }


}
