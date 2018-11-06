import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';

@Injectable({ providedIn: 'root', })
export class UsuarioService extends BaseService{
    constructor(http: HttpClient) {
        super(http, 'usuarios');
    };

    public logar(usuario: Usuario): Observable<any>{
        let headers = new HttpHeaders();
        let url = this.baseURL + "/logar/";
        headers.append('Content-Type', 'application/json');

        let options = { headers: headers };

        return this.http.post(url, usuario, options).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable),);

    }
}