import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { Aluno } from "../../entities/aluno";
import { AlunoService } from "../../service/aluno.service";

@Component({
    selector: 'menu-aluno',
    templateUrl: './menu-aluno.component.html',
})

export class MenuAlunoComponent{

    element: Aluno;
    alunos: Aluno[] = [];
    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();

    radioPesquisa: string = null;
    inputPesquisa: string = "";

    selected = {"default": true};

    constructor(private alunoService: AlunoService){ }

    exibir(component: string){
        this.fecharOutros(component);
        this.selected[component] = true;
        switch(component){
            case "formulario":
                this.bread.emit({ icon: "far fa-plus-square", label: "Adicionar Aluno" });
                break;
            case "tabela":
                this.bread.emit({ icon: "fas fa-list-ul", label: "Pesquisar Alunos" });
                break;
            case "pesquisa":
                this.radioPesquisa = null;
                this.inputPesquisa = "";
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
            this.bread.emit(null);
            this.exibir('formulario');
        })
    }

    pesquisar(campo){
        this.alunos = [];
        switch(campo){
            case "Nome":
                this.alunoService.filtrarPeloNome(this.inputPesquisa).subscribe(data =>{
                    this.alunos = data;
                    this.exibir("tabela");
                });
                break;
            case "Matrícula":
                this.alunoService.filtrarPelaMatricula(this.inputPesquisa).subscribe(data =>{
                    this.alunos = data;
                    this.exibir("tabela");
                });
                break;
            case "Turma":
                this.alunoService.filtrarPelaTurma(this.inputPesquisa).subscribe(data =>{
                    this.alunos = data;
                    this.exibir("tabela");
                });
                break;
            case "todos":
                this.alunoService.listar().subscribe(data =>{
                    this.alunos = data;
                    this.exibir("tabela");
                });

        }
    }
}