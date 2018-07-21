import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base/base-service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService{

    constructor(http: HttpClient) {
        super(http, 'alunos');
    };

    listarAlunos(): Observable<any> {
        let url = this.baseURL + '/';
    
        return this.http.get(url).pipe(
          map(this.extractData),
          catchError(this.handleErrorObservable),);
    };
}