import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';

@Injectable({ providedIn: 'root', })
export class ProfessorService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Professor');
    }

    public listarProfessores() {
        const url = this.baseURL + `/ListarProfessores`;

        return this.http.get<Professor[]>(url);
    }
}
