import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    selected = {"default": false};
    loading: number = 0;
    listaAlunosMenu: MenuItem[];
    cadastroAlunosMenu: MenuItem[];

    ngOnInit(){

    }

    abrirMenu(tipo: string){
        for(var menu in this.selected){
            this.selected[menu] = false;
        }
        this.selected[tipo] = true;
    }
}
