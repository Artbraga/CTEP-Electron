import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { LoadingService } from '../custom-components/loading/loading.service';
import { NotificationService } from '../custom-components/notification/notification.service';
import { BaseFormularioComponent } from '../base/base-formulario.component';
import { NotificationType } from '../custom-components/notification/toaster/toaster';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent extends BaseFormularioComponent<Usuario>  {

    usuario: Usuario;
    constructor(private usuarioService: UsuarioService,
                private loadingService: LoadingService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<ModalLoginComponent>) {
        super(usuarioService, new Usuario());
    }

    login() {
        if (this.validar()) {
            this.loadingService.addLoading();
            this.usuarioService.logar(this.element).subscribe(data => {
                if (data != null) {
                    this.element = Object.assign(new Usuario(), data);
                    this.dialogRef.close(data);
                } else {
                    this.notificationService.addNotification('Erro!', 'Login ou senha incorretos.', NotificationType.Error);
                }
                this.loadingService.removeLoading();
            });
        }
    }

    validar(): boolean {
        return this.stringValida(this.element.login) && this.stringValida(this.element.senha);
    }

}
