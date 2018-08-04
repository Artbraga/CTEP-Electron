import { Component, Input, Output, EventEmitter } from "node_modules/@angular/core";
import { MenuItem } from "../../../../node_modules/primeng/primeng";

@Component({
    selector: 'menu-aluno',
    templateUrl: './menu-aluno.component.html',
})

export class MenuAlunoComponent{

    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();

    selected = {"default": true};

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Aluno" })
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

}