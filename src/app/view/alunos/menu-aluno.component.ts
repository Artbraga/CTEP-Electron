import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { Aluno } from "../../entities/aluno";
import { AlunoService } from "../../service/aluno.service";
import { PerfilAlunoComponent } from "./perfil-aluno/perfil-aluno.component";
import { ObservacaoAluno } from "src/app/entities/observacaoAluno";

@Component({
    selector: 'menu-aluno',
    templateUrl: './menu-aluno.component.html',
})

export class MenuAlunoComponent{

    element: Aluno;
    alunos: Aluno[] = [];
    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();
    @ViewChild('perfilAluno') perfilAluno: PerfilAlunoComponent;

    radioPesquisa: string = null;
    inputPesquisa: string = "";

    selected = {"default": true};

    constructor(private alunoService: AlunoService){ }

    matricula: string;

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
            case "perfil":
                this.bread.emit({ icon: "fas fa-user-circle", label: "Perfil Aluno" });
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
            this.element = Object.assign(new Aluno(), data);
            this.element.observacoes = [];
            data.observacoes.forEach(o => {
                o.data = new Date(o.data);
                this.element.observacoes.push(Object.assign(new ObservacaoAluno(), o));
            });
            this.element.edicao = true;
            this.loading = false;
            this.bread.emit(null);
            this.exibir('formulario');
        })
    }

    visualizarPerfil(matricula: string){
        this.bread.emit(null);
        this.exibir('perfil');
        this.alunoService.buscarAlunoCompleto(matricula).subscribe(data => {
            this.element = Object.assign(new Aluno(), data);
            this.perfilAluno.loading = false;
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