import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class CursoService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'cursos');
    }

    public listarCursosDeEspecializacao(cursoId: number): Observable<any> {
        const url = this.baseURL + '/listarCursosDeEspecializacao/' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData));
    }
}
