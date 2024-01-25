import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Usuario } from "../model/usuario.model";
import { Perfil } from "../model/perfil.model";
import { environment } from "src/environments/environment";
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: "root" })
export class UsuarioService extends BaseService<Usuario> {
    logado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(http: HttpClient) {
        super(http, "Usuario");
    }

    get nomeUsuario(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded["unique_name"];
    }

    get loginUsuario(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded["login"];
    }

    get idUsuario(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
        ];
    }

    get idAluno(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded["idaluno"];
    }

    get perfilUsuario(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded["role"][0];
    }

    get permissoesUsuario(): string {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return decoded["role"].slice(1);
    }

    get expiracaoSessao(): Date {
        const token = localStorage.getItem("token");
        if (token == null) return;
        const decoded = jwt_decode(token);
        return new Date(decoded["exp"] * 1000);
    }

    public deslogar() {
        localStorage.removeItem("token");
        this.logado.next(false);
    }

    public logar(usuario: Usuario): Observable<boolean> {
        const url = `${environment.apiUrl}Login`;
        usuario.escolaId = environment.escolaId;

        return this.http.post(url, usuario, { responseType: "text" }).pipe(
            map((token) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("token", token);
                this.logado.next(true);
                return this.usuarioLogado();
            })
        );
    }

    public renovarToken(): Observable<any> {
        const url = `${environment.apiUrl}Login/RenovarToken`;

        return this.http.post(url, {}, { responseType: "text" }).pipe(
            map((token) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("token", token);
                this.logado.next(true);
            })
        );
    }

    public usuarioLogado(): boolean {
        let token = localStorage.getItem("token");
        if (token == null) return false;
        const now = new Date();
        const nowPlus15min = new Date();
        nowPlus15min.setMinutes(now.getMinutes() + 15);
        if (this.expiracaoSessao > now && this.expiracaoSessao < nowPlus15min) {
            this.renovarToken().subscribe();
        }
        if (this.expiracaoSessao < now) {
            this.deslogar();
            return false;
        } else {
            this.logado.next(true);
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

    public excluirUsuario(id: number): Observable<boolean> {
        const url = this.baseURL + "/Deletar/" + id;

        return this.http.delete<boolean>(url);
    }
}
