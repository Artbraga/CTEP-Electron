import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { Usuario } from '../../../model/usuario.model';
import { version } from '../../../../package.json';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../custom-components/modal-confirmacao/modal-confirmacao.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public version: string = version;
    @ViewChild('sidenav', { static: false }) sidenav: MatDrawer;

    get usuarioLogado(): Usuario {
        return this.usuarioService.buscarUsuarioLogado();
    }
    constructor(private usuarioService: UsuarioService,
                private router: Router,
                public dialog: MatDialog) { }

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

    redirecionar(rota: string) {
        this.router.navigate([{ outlets: { secondRouter: null } }])
            .then(() => this.router.navigate([rota]));
    }

    logout() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente sair do sistema?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate([{ outlets: { secondRouter: null } }]).then(() => {
                    this.router.navigate(['home']).then(() => {
                        this.usuarioService.deslogar();
                    });
                });
            }
        });
    }
}
