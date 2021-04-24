import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario-menu.component.html',
    styleUrls: ['./usuario-menu.component.scss']
})
export class UsuarioMenuComponent implements OnInit {
    expanded = true;
    constructor(private routingService: RoutingService) { }

    ngOnInit(): void { }

    mudarRota() {
        this.expanded = false;
        this.routingService.limparParametros();
    }
}
