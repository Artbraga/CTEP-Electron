import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../model/aluno.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }

    gerarNumeroDeMatricula(cursoId: number, anoMatricula: number): Observable<string> {
        const url = this.baseURL + `/GerarNumeroDeMatricula?cursoId=${cursoId}&anoMatricula=${anoMatricula}`;

        return this.http.get(url, { responseType: 'text' });
    }
}
