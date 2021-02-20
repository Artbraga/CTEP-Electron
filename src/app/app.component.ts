import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.model';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public usuario$: Observable<Usuario>;
    constructor(private usuarioService: UsuarioService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                public dialog: MatDialog) {
        this.usuario$ = usuarioService.usuario.asObservable();
        this.usuario$.subscribe(usr => {
            if (usr == null) {
                this.logar();
            }
        });
        this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    }

    logar() {
        const dialogRef = this.dialog.open(ModalLoginComponent, {
            width: '50vw',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.usuarioService.salvarUsuario(result);
        });
    }
}
