import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';

@Injectable({ providedIn: 'root', })
export class UsuarioService extends BaseService {
    constructor(http: HttpClient) {
        super(http, 'usuarios');
    }

    public logar(usuario: Usuario): Observable<any> {
        const headers = new HttpHeaders();
        const url = this.baseURL + "/logar/";
        headers.append('Content-Type', 'application/json');

        const options = { headers: headers };

        return this.http.post(url, usuario, options).pipe(
            map(this.extractData));

    }
}
