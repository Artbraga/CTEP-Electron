import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-turma-menu',
    templateUrl: './turma-menu.component.html',
    styleUrls: ['./turma-menu.component.scss']
})
export class TurmaMenuComponent implements OnInit {

    expanded: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

}
