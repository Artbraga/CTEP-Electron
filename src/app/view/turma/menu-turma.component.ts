import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { TurmaService } from "../../service/turma.service";
import { Turma } from "../../entities/turma";

@Component({
    selector: 'menu-turma',
    templateUrl: './menu-turma.component.html',
})

export class MenuTurmaComponent{

    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();
    element: any;

    constructor(private turmaService: TurmaService){}

    selected = {"default": true};
    turmas: Turma[];
    inputPesquisa: string = "";

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Turma" });
                break;
            case "tabela":
                this.bread.emit({ icon: "fas fa-list-ul", label: "Pesquisar Alunos" });
                break;
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

    pesquisar(codigo: string){
        this.turmas = [];
        this.turmaService.filtrarTurmasPeloNome(codigo).subscribe((data: Turma[]) =>{
            this.turmas = data;
            this.exibir("tabela");
        });
    }

    listar(){
        this.turmas = [];
        this.turmaService.listar().subscribe((data: Turma[]) =>{
            this.turmas = Turma.fromArray(data);
            this.exibir("tabela");
        })
    }

    carregaTurma(codigo: string){
        this.loading = true;
        this.turmaService.getById(codigo).subscribe(data => {
            this.element = data;
            this.element.edicao = true;
            this.loading = false;
            this.bread.emit(null);
            this.exibir('formulario');
        })
    }

}