import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class DisciplinaService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'disciplinas');
    }

    public listarDisciplinasDeUmCurso(cursoId: number): Observable<any> {
        const url = this.baseURL + '/listarDisciplinasDeUmCurso/' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarDisciplinasDeUmCurso(cursoId: number, nome: String): Observable<any> {
        const url = this.baseURL + '/filtrarDisciplinasDeUmCurso/' + cursoId + "&" + nome;

        return this.http.get(url).pipe(
            map(this.extractData));
    }
}
