import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseTable, Coluna } from "src/app/custom-components/base-table";
import { FormularioUsuarioRoute, IdUsuarioParameter, RotaVoltarParameter, TabelaUsuarioRoute } from "src/model/enums/constants";
import { Usuario } from "src/model/usuario.model";
import { RoutingService } from "src/services/routing.service";
import { UsuarioService } from "src/services/usuario.service";

@Component({
    selector: "app-tabela-usuario",
    templateUrl: "./tabela-usuario.component.html",
    styleUrls: ["./tabela-usuario.component.scss"],
})
export class TabelaUsuarioComponent extends BaseTable<Usuario> implements OnInit {

    constructor(private usuarioService: UsuarioService,
                private routingService: RoutingService,
                private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'nome' } as Coluna);
        this.columns.push({ key: 'login', header: 'Login', field: 'login' } as Coluna);
        this.columns.push({ key: 'perfil', header: 'Perfil', field: 'perfil.nome' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
        this.pesquisar();
    }

    pesquisar() {
        this.usuarioService.listarUsuarios().subscribe(data => {
            this.list = data.map(x => Object.assign(new Usuario(), x));
        });
    }

    editarUsuario(usuario: Usuario) {
        this.routingService.salvarValor(IdUsuarioParameter, usuario.id);
        this.routingService.salvarValor(RotaVoltarParameter, TabelaUsuarioRoute);
        this.router.navigate([{ outlets: { secondRouter: FormularioUsuarioRoute } }]);
    }

    excluirUsuario(usuario: Usuario) {

    }
}
