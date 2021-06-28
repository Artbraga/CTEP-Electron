import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/services/routing.service';

@Component({
    selector: 'app-financeiro-menu',
    templateUrl: './financeiro-menu.component.html',
    styleUrls: ['./financeiro-menu.component.scss']
})
export class FinanceiroMenuComponent implements OnInit {

    expanded = true;

    constructor(private routingService: RoutingService) { }

    ngOnInit(): void {
    }

    mudarRota() {
        this.expanded = false;
        this.routingService.limparParametros();
    }

}
