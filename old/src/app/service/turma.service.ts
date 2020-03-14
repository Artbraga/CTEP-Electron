import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotaAluno } from '../entities/notaAluno';

@Injectable({ providedIn: 'root', })
export class TurmaService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'turmas');
    }

    getTurmasDropdown(codigo: string): Observable<any> {
        const url = this.baseURL + '/filtrarTurmasDropdown/' + codigo;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public gerarCodigo(ano: number, cursoId: number): Observable<any> {
        const url = this.baseURL + '/gerarCodigo/' + ano + '&' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarTurmasDeUmCurso(cursoId: number, nome: string): Observable<any> {
        const url = this.baseURL + '/filtrarTurmasDeUmCurso/' + nome + '&' + cursoId;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrarTurmasPeloNome(nome: string): Observable<any> {
        const url = this.baseURL + '/filtrarTurmasPeloNome/' + nome;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public listarNotasDeUmaTurmaEDisciplina(codigoTurma: string, idDisciplina: number): Observable<any> {
        const url = this.baseURL + '/listarNotasDeUmaTurmaEDisciplina/' + codigoTurma + '&' + idDisciplina;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public salvarNotas(notas: NotaAluno[]): Observable<any> {

        const url = this.baseURL + '/salvarNotas/';

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const options = { headers: headers };

        return this.http.post(url, notas, options).pipe(
            map(this.extractData));
    }

}