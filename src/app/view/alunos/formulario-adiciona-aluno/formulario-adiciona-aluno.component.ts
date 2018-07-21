import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BaseFormulario } from "src/app/base/baseFormulario";
import { Aluno } from "src/app/entities/aluno";
import { ViacepService } from 'src/app/service/ngx-viacep/viacep.service';
import { CepError, Endereco } from "src/app/service/ngx-viacep/endereco";
import { Message } from "primeng/primeng";

@Component({
    selector: 'formulario-adiciona-aluno',
    templateUrl: './formulario-adiciona-aluno.component.html',
})
export class FormularioAdicionaAlunoComponent extends BaseFormulario<Aluno> implements OnInit{
    
    constructor(private viacep: ViacepService,
                ref: ChangeDetectorRef){
        super(ref);
    }
    ngOnInit(){
        if (this.element == null)
            this.element = new Aluno();
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

    showMessage(msg: Message){
        console.log(msg);
        this.msgs.push(msg);
        this.updateView();  
    }
}
