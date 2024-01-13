import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Usuario } from "../model/usuario.model";
import { Perfil } from "../model/perfil.model";

@Injectable({ providedIn: "root" })
export class UsuarioService extends BaseService<Usuario> {
    private lock: boolean = false;

    constructor(http: HttpClient) {
        super(http, "Usuario");
    }

    get nomeUsuario(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded["unique_name"];
    }

    get loginUsuario(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded["login"];
    }

    get idUsuario(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
        ];
    }

    get idAluno(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded["idaluno"];
    }

    get perfilUsuario(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded["role"][0];
    }

    get permissoesUsuario(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return decoded["role"].slice(1);
    }

    get expiracaoSessao(): Date {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        return new Date(decoded["exp"] * 1000);
    }

    public deslogar() {
        localStorage.removeItem("token");
    }

    public buscarUsuarioLogado(): Usuario {
        return this.usuario.value;
    }

    public logar(usuario: Usuario): Observable<any> {
        const url = this.baseURL + "/";

        return this.http.post(url, usuario, { responseType: "text" }).pipe(
            map((token) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("token", token);
                this.usuarioLogado();
            })
        );
    }

    public renovarToken(): Observable<any> {
        const url = this.baseURL + "/RenovarToken";
        this.lock = true;

        return this.http.post(url, {}, { responseType: "text" }).pipe(
            map((token) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("token", token);
                this.lock = false;
            })
        );
    }

    public usuarioLogado(): boolean {
        let token = localStorage.getItem("token");
        if (token == null) return false;
        const now = new Date();
        const nowPlus15min = new Date();
        nowPlus15min.setMinutes(now.getMinutes() + 15);
        if (
            this.expiracaoSessao > now &&
            this.expiracaoSessao < nowPlus15min &&
            !this.lock
        ) {
            this.renovarToken().subscribe();
        }
        if (this.expiracaoSessao < now) {
            this.deslogar();
            return false;
        } else {
            return true;
        }
    }

    public listarUsuarios(): Observable<Usuario[]> {
        const url = this.baseURL + "/ListarUsuarios";

        return this.http.get<Usuario[]>(url);
    }

    public listarPerfis(): Observable<Perfil[]> {
        const url = this.baseURL + "/ListarPerfis";

        return this.http.get<Perfil[]>(url);
    }

    public buscarPerfisComUsuarios(): Observable<Perfil[]> {
        const url = this.baseURL + "/BuscarPerfisComUsuarios";

        return this.http.get<Perfil[]>(url);
    }
}
