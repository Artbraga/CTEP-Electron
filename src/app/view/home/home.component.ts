import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    selected = {"default": false};
    loading: number = 0;
    breadCrumbItems: MenuItem[] = [];
    home: MenuItem;

    @ViewChild('menuAluno') menuAluno;

    ngOnInit(){
        this.home = { icon: 'fas fa-home', command: () => this.showHome() }
    }

    abrirMenu(tipo: string){
        this.fecharOutros(tipo);
        this.selected[tipo] = true;
        this.breadCrumbItems = [];
        switch(tipo){
            case "aluno":
                this.breadCrumbItems.push( { label:"Alunos", icon: 'fas fa-user-graduate', command: () => this.resetTela('aluno') } );
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
        this.breadCrumbItems.push(menu);
    }

    resetTela(tela: string){
        this.selected[tela] = true;
        switch(tela){
            case "aluno":
                this.menuAluno.exibir("default");;
        }
    }
}
