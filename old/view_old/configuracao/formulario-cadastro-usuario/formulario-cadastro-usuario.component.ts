import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseFormulario } from 'src/app/base/base-formulario';
import { Usuario } from 'src/app/entities/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { SelectItem } from 'primeng/primeng';
import { elementAt } from 'rxjs/operators';

@Component({
    selector: 'formulario-cadastro-usuario',
    templateUrl: './formulario-cadastro-usuario.component.html',
})
export class FormularioCadastroUsuarioComponent extends BaseFormulario<Usuario> implements OnInit {

    permissaoSelecionada: SelectItem;
    permissoesOptions: SelectItem[];
    permissoesSuggestions: any;
    tentouAdicionarUsuario: boolean = false;

    constructor(private usuarioService: UsuarioService, ref :ChangeDetectorRef) { 
        super(usuarioService, ref);
    }

    ngOnInit() {
        this.permissoesOptions = [
            {label: "Consulta", value:1 },
            {label: "Secretaria", value:2 },
            {label: "Coordenação", value:3 },
            {label: "Administrador", value:4 },
        ];
        if(this.element.id == null){
            this.permissaoSelecionada = this.permissoesOptions[1];
        }
        else{
            this.permissaoSelecionada = this.permissoesOptions.filter(x => x.value == this.element.permissao)[0];
        }
    }

    buscarDropdown(busca, campo: string){
        let filter = busca.query;
        switch(campo){
            case "permissao":
                this.permissoesSuggestions = this.permissoesOptions.filter(x => x.label.toLowerCase().includes(filter.toLowerCase()))
                break;
        }
    }

    isCampoInvalido(campo: string): boolean{
        switch (campo) {
            case 'nome':
                return this.tentouAdicionarUsuario && (this.element == null || !this.validField(this.element.nome));
            case 'login':
                return this.tentouAdicionarUsuario && (this.element == null || !this.validField(this.element.login));
            case 'senha':
                return this.tentouAdicionarUsuario && (this.element == null || !this.validField(this.element.senha));
            case 'telefone':
                return this.tentouAdicionarUsuario && (this.element == null || !this.validField(this.element.telefone));
        }
        return false;
    }

    cadastrarUsuario(){
        this.element.permissao = this.permissaoSelecionada.value;
        this.loading = 1;
        this.updateView();
        this.usuarioService.salvar(this.element, 
            () =>{
                this.element = new Usuario;
                this.permissaoSelecionada = this.permissoesOptions[1];
                this.updateView();
                this.loading = 0;
                this.showFeedbackMessage({ severity: 'success', summary: 'Sucesso!', detail: 'Usuário cadastrado com sucesso!' });
            },
            (err) =>{
                this.showFeedbackMessage(err.msg);
            });
    }
}
