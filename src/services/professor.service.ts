import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';
import { FiltroProfessor } from 'src/model/filters/professor.filter';

@Injectable({ providedIn: 'root', })
export class ProfessorService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Professor');
    }

    public listarProfessores() {
        const url = this.baseURL + `/ListarProfessores`;

        return this.http.get<Professor[]>(url);
    }

    public listarProfessoresAtivos() {
        const url = this.baseURL + `/ListarProfessoresAtivos`;

        return this.http.get<Professor[]>(url);
    }

    filtrarProfessores(filtro: FiltroProfessor): Observable<Professor[]> {
        const url = this.baseURL + `/FiltrarProfessores`;

        return this.http.post<Professor[]>(url, filtro);
    }
}
