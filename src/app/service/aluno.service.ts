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

    public filtrarPelaMatricula(matricula: string): Observable<any>{
        let url = this.baseURL + '/filtrarPelaMatricula/'+ matricula;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

    public filtrarPelaTurma(turma: string): Observable<any>{
        let url = this.baseURL + '/filtrarPelaTurma/'+ turma;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

    public filtrarPeloNome(turma: string): Observable<any>{
        let url = this.baseURL + '/filtrarPeloNome/'+ turma;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

    public buscarAlunoCompleto(matricula: string): Observable<any>{
        let url = this.baseURL + '/buscarAlunoCompleto/'+ matricula;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

    
}