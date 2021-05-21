import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { Usuario } from '../model/usuario.model';
import { Perfil } from '../model/perfil.model';

@Injectable({ providedIn: 'root', })
export class UsuarioService extends BaseService<Usuario> {
    usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);
    constructor(http: HttpClient) {
        super(http, 'Usuario');
    }

    public salvarUsuario(usr: Usuario) {
        this.usuario.next(usr);
    }

    public deslogar() {
        this.usuario.next(null);
    }

    public buscarUsuarioLogado(): Usuario {
        return this.usuario.value;
    }


    public logar(usuario: Usuario): Observable<Usuario> {
        const url = this.baseURL + '/BuscarUsuarioPorLoginESenha';

        return this.http.post<Usuario>(url, usuario);
    }

    public listarUsuarios(): Observable<Usuario[]> {
        const url = this.baseURL + '/ListarUsuarios';

        return this.http.get<Usuario[]>(url);
    }

    public listarPerfis(): Observable<Perfil[]> {
        const url = this.baseURL + '/ListarPerfis';

        return this.http.get<Perfil[]>(url);
    }

    public buscarPerfisComUsuarios(): Observable<Perfil[]> {
        const url = this.baseURL + '/BuscarPerfisComUsuarios';

        return this.http.get<Perfil[]>(url);
    }
}
