import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('sidenav', {static: false}) sidenav: MatDrawer;
    constructor() { }

    ngOnInit(): void {
    }

    desenhar(move: string) {
        switch (move) {
            case 'in': {
                if (!this.sidenav.opened) {
                    this.sidenav.toggle();
                }
                break;
            }
            case 'out': {
                if (this.sidenav.opened) {
                    this.sidenav.toggle();
                }
                break;
            }
        }
    }
}
