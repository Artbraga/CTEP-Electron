import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Curso } from '../model/curso.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class CursoService extends BaseService<Curso> {
    constructor(http: HttpClient) {
        super(http, 'Curso');
    }

    listarCursos(): Observable<Curso[]> {
        const url = this.baseURL + '/ListarCursos';

        return this.http.get<Curso[]>(url);
    }
}
