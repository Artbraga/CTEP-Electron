import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class TurmaService extends BaseService{

    constructor(http: HttpClient) {
        super(http, 'turmas');
    };

    getTurmasDropdown(codigo: string) : Observable<any> {
        let url = this.baseURL + '/filtrarTurmasDropdown/' + codigo;
    
        return this.http.get(url).pipe(
          map(this.extractData),
          catchError(this.handleErrorObservable),);
    }

    public gerarCodigo(ano: number, cursoId: number): Observable<any>{
        let url = this.baseURL + '/gerarCodigo/'+ ano + '&' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }
}