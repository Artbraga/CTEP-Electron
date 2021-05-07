import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';

@Component({
    selector: 'app-professor-menu',
    templateUrl: './professor-menu.component.html',
    styleUrls: ['./professor-menu.component.scss']
})
export class ProfessorMenuComponent implements OnInit {
    expanded = true;
    constructor(private routingService: RoutingService) {}

    ngOnInit(): void {}

    mudarRota() {
        this.expanded = false;
        this.routingService.limparParametros();
    }
}
