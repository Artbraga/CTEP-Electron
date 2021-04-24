import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IdUsuarioParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { Perfil } from '../../../../model/perfil.model';
import { Pessoa } from '../../../../model/pessoa.model';
import { Usuario } from '../../../../model/usuario.model';
import { RoutingService } from '../../../../services/routing.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { VincularUsuarioComponent } from '../vincular-usuario/vincular-usuario.component';

@Component({
    selector: 'app-formulario-usuario',
    templateUrl: './formulario-usuario.component.html',
    styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent extends BaseFormularioComponent<Usuario> implements OnInit {

    perfisOptions: Perfil[];
    perfilSelecionado: Perfil;

    vinculado: boolean;
    pessoa: Pessoa;

    constructor(private usuarioService: UsuarioService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Usuario());
    }

    ngOnInit(): void {
        this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
        this.isEdicao = true;
        this.id = this.routingService.excluirValor(IdUsuarioParameter) as number;
        this.usuarioService.listarPerfis().subscribe(data => {
            this.perfisOptions = data.map(x => Object.assign(new Perfil(), x));
        });
    }

    salvar() {

    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    validar(): boolean {
        let valido = true;
        if (this.element.login == null || this.element.login == '') {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o login do usuário.', NotificationType.Error);
        }
        if (this.element.login == null || this.element.login == '') {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o login do usuário.', NotificationType.Error);
        }
        return valido;
    }

    vincular() {
        const dialogRef = this.dialog.open(VincularUsuarioComponent);
        dialogRef.afterClosed().subscribe((result: Pessoa) => {
            if (result != null) {
                this.pessoa = result;
                this.element.nome = this.pessoa.nome;
                this.element.telefone = this.pessoa.telefone;
                this.element.email = this.pessoa.email;
                this.element.login = this.constroiLogin(this.pessoa.nome);
            }
        });
    }

    removerVinculo() {
        this.pessoa = null;
        this.element.alunoId = null;
        this.element.professorId = null;
    }

    constroiLogin(nome: string): string {
        const nomeSeparado = nome.trim().split(' ');
        return `${nomeSeparado[0]}.${nomeSeparado[nomeSeparado.length - 1]}`.toLocaleLowerCase();
    }
}
