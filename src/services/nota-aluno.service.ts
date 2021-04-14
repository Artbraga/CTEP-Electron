import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaAluno } from '../model/nota-aluno.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root', })
export class NotaAlunoService extends BaseService<NotaAluno> {
    constructor(http: HttpClient) {
        super(http, 'Nota');
    }

    salvarNotas(notas: NotaAluno[]): Observable<any> {
        const url = this.baseURL + `/SalvarNotas`;

        return this.http.post(url, notas);
    }

    public listarNotasDeUmAluno(alunoId: number) {
        const url = this.baseURL + `/ListarNotasDeUmAluno/${alunoId}`;

        return this.http.get<NotaAluno[]>(url);
    }
}
