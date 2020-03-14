import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'alunos');
    }

    public gerarMatricula(ano: number, cursoId: number): Observable<any> {
        const url = this.baseURL + '/gerarMatricula/' + ano + '&' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarPelaMatricula(matricula: string): Observable<any> {
        const url = this.baseURL + '/filtrarPelaMatricula/' + matricula;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarPelaTurma(turma: string): Observable<any> {
        const url = this.baseURL + '/filtrarPelaTurma/' + turma;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarPeloNome(turma: string): Observable<any> {
        const url = this.baseURL + '/filtrarPeloNome/' + turma;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public buscarAlunoCompleto(matricula: string): Observable<any> {
        const url = this.baseURL + '/buscarAlunoCompleto/' + matricula;

        return this.http.get(url).pipe(
            map(this.extractData));
    }
}
