import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Turma } from '../model/turma.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from '../model/curso.model';

@Injectable({ providedIn: 'root', })
export class TurmaService extends BaseService<Turma> {

    constructor(http: HttpClient) {
        super(http, 'Turma');
    }

    public buscarTurmasDeUmCurso(cursoId: number) {
        const url = this.baseURL + `/ListarTurmasDeUmCurso?cursoId=${cursoId}`;

        return this.http.get<Turma[]>(url);
    }

    public listarTurmasAtivas(): Observable<Turma[]> {
        const url = this.baseURL + `/ListarTurmasAtivas`;

        return this.http.get<Turma[]>(url);
    }

    public buscarTurmasPorCodigoECurso(codigo: string, cursoId: number): Observable<Turma[]> {
        const url = this.baseURL + `/buscarTurmasPorCodigoECurso?codigo=${codigo}${cursoId != null ? `&cursoId=${cursoId}`:''}`;

        return this.http.get<Turma[]>(url);
    }

    public gerarCodigoDaTurma(cursoId: number, anoTurma: number): Observable<string> {
        const url = this.baseURL + `/GerarCodigoDaTurma?cursoId=${cursoId}&anoTurma=${anoTurma}`;

        return this.http.get(url, { responseType: 'text' });
    }
}
