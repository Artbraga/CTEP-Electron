import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Aluno } from '../entities/aluno';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService{

    constructor(http: HttpClient) {
        super(http, 'alunos');
    };

    public gerarMatricula(ano: number, cursoId: number): Observable<any>{
        let url = this.baseURL + '/gerarMatricula/'+ ano + '&' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

}