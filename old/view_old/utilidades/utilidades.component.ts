import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem, Message } from 'primeng/primeng';

@Component({
    selector: 'utilidades-component',
    templateUrl: './utilidades.component.html',
})
export class UtilidadesComponent implements OnInit {

    @Input() loading: number;
    @Output() bread = new EventEmitter<MenuItem>();

    msgs: Message[];
    idElement: number;
    tipo: string;

    constructor() { }

    ngOnInit() {
        this.msgs = [];
    }

    exibir(component: string){
        this.tipo = component;
        if(component == null) this.idElement = 0;
    }

    public showFeedbackMessage(m: Message) {
        if (m == null) {
            return;
        }
        this.msgs.push(m);
    }

    carregar(params: {tipo: string, id: number}){
        switch(params.tipo){
            case "tabela-hospital":
                this.tipo = "formulario-hospital";
                this.idElement = params.id;
                break;

            case "tabela-modalidade":
                this.tipo = "formulario-modalidade";
                this.idElement = params.id;
                break;
        }
    }

}
