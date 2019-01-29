import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";

@Component({
    selector: 'menu-professor',
    templateUrl: './menu-professor.component.html',
})

export class MenuProfessorComponent{

    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();

    selected = {"default": true};

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Professor" })
            case "tabela":
                this.bread.emit({ icon: "fas fa-list-ul", label: "Listar Professores" })
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

}