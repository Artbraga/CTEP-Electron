import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { Usuario } from '../model/usuario.model';

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


    public logar(usuario: Usuario): Observable<Usuario> {
        const url = this.baseURL + '/BuscarUsuarioPorLoginESenha';

        return this.http.post<Usuario>(url, usuario);
    }
}
