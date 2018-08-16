import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { Aluno } from "src/app/entities/aluno";
import { AlunoService } from "../../service/aluno.service";

@Component({
    selector: 'menu-aluno',
    templateUrl: './menu-aluno.component.html',
})

export class MenuAlunoComponent{

    element: Aluno;
    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();

    selected = {"default": true};

    constructor(private alunoService: AlunoService){ }

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Aluno" });
                break;
            case "formulario":
                this.bread.emit({ icon: "fas fa-list-ul", label: "Filtrar Alunos" });
                break;
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

    carregaAluno(matricula: string){
        this.loading = true;
        this.alunoService.getById(matricula).subscribe(data => {
            this.element = data;
            this.element.edicao = true;
            this.loading = false;
            this.exibir('formulario');
        })
    }
}