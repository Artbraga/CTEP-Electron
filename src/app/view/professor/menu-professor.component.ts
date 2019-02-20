import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { ProfessorService } from "src/app/service/professor.service";
import { Professor } from "src/app/entities/professor";

@Component({
    selector: 'menu-professor',
    templateUrl: './menu-professor.component.html',
})

export class MenuProfessorComponent{

    @Input() loading: number;
    @Output() bread = new EventEmitter<MenuItem>();

    selected = {"default": true};

    element: Professor;

    constructor(private professorService: ProfessorService){
        this.element = new Professor();
    }

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Professor" });
                break;
            case "tabela":
                this.bread.emit({ icon: "fas fa-list-ul", label: "Listar Professores" });
                break;
            case "default":
                this.bread.emit(null);
                break;
        }
    }

    carregaProfessor(id: number){
        this.professorService.getById(id).subscribe(data =>{
            this.element = Object.assign(new Professor(), data);
            this.element.dataNascimento = new Date(data.dataNascimento);
            this.element.edicao = true;
            this.bread.emit(null);
            this.exibir("formulario");
        })
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

}