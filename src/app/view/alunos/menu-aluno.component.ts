import { Component, Input } from "node_modules/@angular/core";

@Component({
    selector: 'menu-aluno',
    templateUrl: './menu-aluno.component.html',
})

export class MenuAlunoComponent{

    @Input() loading;

    selected = {"default": true};

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;

    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }
}