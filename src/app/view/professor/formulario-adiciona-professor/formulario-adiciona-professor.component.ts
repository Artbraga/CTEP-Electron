import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "../../../base/baseFormulario";
import { Professor } from "../../../entities/professor";
import { TurmaService } from "../../../service/turma.service";
import { ViacepService } from "../../../service/ngx-viacep/viacep.service";
import { Endereco, CepError } from "../../../service/ngx-viacep/endereco";

@Component({
    selector: 'formulario-adiciona-professor',
    templateUrl: './formulario-adiciona-professor.component.html',
})
export class FormularioAdicionaProfessorComponent extends BaseFormulario<Professor> implements OnInit{
    
    tentouAdicionarProfessor: boolean = false;

    constructor(private viacep: ViacepService,
        private turmaService: TurmaService,
        ref: ChangeDetectorRef){
        super(turmaService, ref);
    }

    ngOnInit(){
        if (this.element == null)
            this.element = new Professor();
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
                this.showFeedbackMessage({ severity:'success', summary:'Endereo encontrado', detail:'Endereço encontrado com sucesso!' })
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

    desabilitarBotaoBuscaCep(){
        return !/^[0-9]{8}$/.test(this.element.cep);
    }

    isCampoInvalido(campo: string): boolean{
        switch (campo) {
            case 'nome':
                return this.tentouAdicionarProfessor && (this.element == null || !this.validField(this.element.nome));
            case 'cpf':
                return this.tentouAdicionarProfessor && (this.element == null || !this.validField(this.element.cpf));
            case 'endereco':
                return this.tentouAdicionarProfessor && (this.element == null || !this.validField(this.element.endereco));
            case 'cep':
                return this.tentouAdicionarProfessor && (this.element == null || !this.validField(this.element.cep));
            case 'rg':
                return this.tentouAdicionarProfessor && (this.element == null || !this.validField(this.element.rg));
        }
        return false;
    }
}