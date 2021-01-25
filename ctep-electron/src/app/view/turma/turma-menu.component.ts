import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';

@Component({
    selector: 'app-turma-menu',
    templateUrl: './turma-menu.component.html',
    styleUrls: ['./turma-menu.component.scss']
})
export class TurmaMenuComponent implements OnInit {

    expanded = true;

    constructor(private routingService: RoutingService) { }

    ngOnInit(): void {
    }

    mudarRota() {
        this.expanded = false;
        this.routingService.limparParametros();
    }
}
