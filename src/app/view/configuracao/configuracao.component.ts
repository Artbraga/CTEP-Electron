import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Usuario } from 'src/app/entities/usuario';

@Component({
    selector: 'configuracao-component',
    templateUrl: './configuracao.component.html',
})
export class ConfiguracaoComponent {

    usuario: Usuario;
    @Input() loading: number;
    @Output() bread = new EventEmitter<MenuItem>();

    selected = {"default": true};
    
    constructor() {
        this.usuario = new Usuario();
     }

    ngOnInit() {
    }

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "cadastro-usuario":
                this.bread.emit({ icon: "fas fa-users", label: "Cadastrar Usuário" });
                break;
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }
}
