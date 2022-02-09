import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { resourceLimits } from 'node:worker_threads';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PerfilEnum } from 'src/model/enums/perfil.enum';
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
    senha: string;
    senha2: string;

    constructor(private usuarioService: UsuarioService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Usuario());
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdUsuarioParameter)) {
            this.isEdicao = true;
            this.id = this.routingService.excluirValor(IdUsuarioParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            forkJoin([
                this.usuarioService.getById(this.id),
                this.usuarioService.listarPerfis()
            ]).subscribe(([usuario, perfis]) => {
                this.carregarUsuario(usuario);
                this.perfisOptions = perfis.map(x => Object.assign(new Perfil(), x));
                this.perfilSelecionado = this.perfisOptions.find(x => x.nome == this.element.perfil.nome);
            });

        } else {
            this.usuarioService.listarPerfis().subscribe(data => {
                this.perfisOptions = data.map(x => Object.assign(new Perfil(), x));
            });
        }
    }

    salvar() {
        if (this.validar()) {
            this.element.perfil = this.perfilSelecionado;
            this.element.senha = this.senha;
            this.usuarioService.salvar(this.element).subscribe(data => {
                this.notificationService.addNotification('Sucesso!', 'Usuário salvo com sucesso.', NotificationType.Success);
                if (this.element.id != null) {
                    this.notificationService.addNotification('Senha padrão.', 'A senha será .', NotificationType.Notification);
                }
            });
        }
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    carregarUsuario(usuario: Usuario) {
        this.element = Object.assign(new Usuario(), usuario);
        this.vinculado = this.element.tipo != null;
    }

    validar(): boolean {
        let valido = true;
        if (!this.stringValida(this.element.login)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o login do usuário.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.nome)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o nome do usuário.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.telefone)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o telefone do usuário.', NotificationType.Error);
        }
        if (this.perfilSelecionado == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione um perfil para o usuário.', NotificationType.Error);
        }
        if (!this.isEdicao) {
            if (!this.stringValida(this.senha) || this.senha.length < 6 || !this.stringValida(this.senha2) || this.senha2.length < 6) {
                valido = false;
                this.notificationService.addNotification('Erro!', 'Sua senha precisa ter ao menos 6 dígitos.', NotificationType.Error);
            }
            if (this.senha !== this.senha2) {
                valido = false;
                this.notificationService.addNotification('Erro!', 'As senhas digitadas são diferentes.', NotificationType.Error);
            }
        }
        return valido;
    }

    vincular() {
        const dialogRef = this.dialog.open(VincularUsuarioComponent);
        dialogRef.afterClosed().subscribe((result: Pessoa) => {
            if (result != null) {
                this.vinculado = true;
                this.element.nome = result.nome;
                this.element.telefone = result.telefone;
                this.element.email = result.email;
                this.element.login = this.constroiLogin(result.nome);
                this.element.tipo = result.tipo;
                if (result.tipo == 'aluno') {
                    this.perfilSelecionado = this.perfisOptions.find(x => x.nome == PerfilEnum.Aluno);
                    this.element.alunoId = result.id;
                } else if (result.tipo == 'professor') {
                    this.perfilSelecionado = this.perfisOptions.find(x => x.nome == PerfilEnum.Professor);
                    this.element.professorId = result.id;
                }
            }
        });
    }

    removerVinculo() {
        this.vinculado = false;
        this.element.alunoId = null;
        this.element.professorId = null;
    }

    constroiLogin(nome: string): string {
        const nomeSeparado = nome.trim().split(' ');
        return `${nomeSeparado[0]}.${nomeSeparado[nomeSeparado.length - 1]}`.toLocaleLowerCase();
    }

    limpar() {
        this.element = new Usuario();
        this.perfilSelecionado = null;
    }
}
