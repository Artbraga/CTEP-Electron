import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'configuracao-component',
    templateUrl: './configuracao.component.html',
})
export class ConfiguracaoComponent {

    @Input() loading: boolean;
    @Output() bread = new EventEmitter<MenuItem>();
    
    constructor() { }

    ngOnInit() {
    }

}
