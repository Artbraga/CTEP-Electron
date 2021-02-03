import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';

@Component({
    selector: 'app-aluno-menu',
    templateUrl: './aluno-menu.component.html',
    styleUrls: ['./aluno-menu.component.scss'],
})
export class AlunoMenuComponent implements OnInit {
    expanded = true;
    constructor(private routingService: RoutingService) {}

    ngOnInit(): void {}

    mudarRota() {
        this.expanded = false;
        this.routingService.limparParametros();
    }
}
