import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../entities/usuario';
import { Message } from 'primeng/primeng';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    selected = {"default": false};
    loading: number = 0;
    breadCrumbItems: MenuItem[] = [];
    home: MenuItem;
    msgs: Message[] = [];
    
    displayLogin: boolean = true;
    usuario: Usuario;

    @ViewChild('menuAluno') menuAluno;
    @ViewChild('menuProfessor') menuProfessor;
    @ViewChild('menuTurma') menuTurma;
    @ViewChild('menuconfiguracao') menuconfiguracao;

    constructor(private usuarioService: UsuarioService){
    }

    ngOnInit(){
        this.home = { icon: 'fas fa-home', command: () => this.showHome() }
        this.usuario = new Usuario();
    }

    abrirMenu(tipo: string){
        this.fecharOutros(tipo);
        this.selected[tipo] = true;
        this.breadCrumbItems = [];
        switch(tipo){
            case "aluno":
                this.breadCrumbItems.push( { label:"Alunos", icon: 'fas fa-user-graduate', command: () => this.resetTela('aluno') } );
                this.resetTela('aluno');
                break;
            case "turma":
                this.breadCrumbItems.push( { label:"Turmas", icon: 'fas fa-users', command: () => this.resetTela('turma') } );
                this.resetTela('turma');
                break;
            case "professor":
                this.breadCrumbItems.push( { label:"Professores", icon: 'fas fa-chalkboard-teacher', command: () => this.resetTela('professor') } );
                this.resetTela('professor');
                break;
            case "configuracao":
                this.breadCrumbItems.push( { label:"Configurações", icon: 'fas fa-cog', command: () => this.resetTela('professor') } );
                this.resetTela('configuracao');
                break;
        }
    }

    fecharOutros(tipo: string){
        for(var menu in this.selected){
            if(tipo != menu)
                this.selected[menu] = false;
        }
    }

    showHome(){
        for(var menu in this.selected){
            this.selected[menu] = false;
        }
    }

    adicionaBread(menu: MenuItem){
        if(menu != null)
            this.breadCrumbItems.push(menu);
        else
            this.breadCrumbItems.splice(-1,1);
    }

    resetTela(tela: string){
        this.selected[tela] = true;
        switch(tela){
            case "aluno":
                if(this.menuAluno != null)
                    this.menuAluno.exibir("default");
                this.breadCrumbItems = [];
                this.breadCrumbItems.push( { label:"Alunos", icon: 'fas fa-user-graduate', command: () => this.resetTela('aluno') } );
                break;
            case "turma":
                if(this.menuTurma != null)
                    this.menuTurma.exibir("default");
                this.breadCrumbItems = [];
                this.breadCrumbItems.push( { label:"Turma", icon: 'fas fa-users', command: () => this.resetTela('turma') } );
                break;
            case "professor":
                if(this.menuProfessor != null)
                    this.menuProfessor.exibir("default");
                this.breadCrumbItems = [];
                this.breadCrumbItems.push( { label:"Professores", icon: 'fas fa-chalkboard-teacher', command: () => this.resetTela('professor') } );
                break;
            case "configuracao":
                if(this.menuconfiguracao != null)
                    this.menuconfiguracao.exibir("default");
                this.breadCrumbItems = [];
                this.breadCrumbItems.push( { label:"Configurações", icon: 'fas fa-cog', command: () => this.resetTela('configuracao') } );
                break;
        }
    }

    login(){
        //this.displayLogin = false;
        this.usuarioService.logar(this.usuario).subscribe((data: Usuario) =>{
            if(data == null){
                this.showFeedbackMessage({ severity:'error', summary:'Falha no login', detail:'Usuário ou senha incorreto! Tente novamente.' })
            }
            else{
                this.usuario = data;
                this.showFeedbackMessage({ severity:'success', summary:'Logado com sucesso', detail:'Bem vindo(a) '+ this.usuario.nome + '!' })
                this.displayLogin = false;
            }
        })
    }

    fechar(){
        window.close();
    }

    private showFeedbackMessage(m: Message) {
        if (m == null) {
            return;
        }
        this.msgs.push(m);
    }

    logout(){
        this.displayLogin = true;
        this.breadCrumbItems = [];
        this.selected = {"default": false};
        this.usuario = new Usuario();
    }
}
