import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from '../model/disciplina.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root', })
export class DisciplinaService extends BaseService<Disciplina> {
    constructor(http: HttpClient) {
        super(http, 'Disciplina');
    }

    public listarDisciplinasDeUmCurso(cursoId: number) {
        const url = this.baseURL + `/ListarDisciplinasDeUmCurso/${cursoId}`;

        return this.http.get<Disciplina[]>(url);
    }
}
