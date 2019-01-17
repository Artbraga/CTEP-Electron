import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'configuracao',
    templateUrl: './configuracao.component.html',
})
export class ConfiguracaoComponent implements OnInit {

    @Input() loading;
    @Output() bread = new EventEmitter<MenuItem>();
    
    constructor() { }

    ngOnInit() {
    }

}
