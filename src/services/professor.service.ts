import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Turma } from '../model/turma.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';

@Injectable({ providedIn: 'root', })
export class ProfessorService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Turma');
    }

    public buscarTurmasDeUmCurso(cursoId: number) {
        const url = this.baseURL + `/ListarTurmasDeUmCurso/${cursoId}`;

        return this.http.get<Turma[]>(url);
    }

    public listarTurmasAtivas(): Observable<Turma[]> {
        const url = this.baseURL + `/ListarTurmasAtivas`;

        return this.http.get<Turma[]>(url);
    }
}
