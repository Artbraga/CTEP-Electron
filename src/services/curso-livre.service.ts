import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlunoCursoLivre } from "src/model/aluno-curso-livre.model";
import { CursoLivre } from "src/model/curso-livre.model";
import { FiltroCursoLivre } from "src/model/filters/curso-livre.filter";
import { ParticipacaoCursoLivre } from "src/model/participacao-curso-livre.model";
import { TurmaCursoLivre } from "src/model/turma-curso-livre.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root', })
export class CursoLivreService extends BaseService<CursoLivre> {

    constructor(http: HttpClient) {
        super(http, 'CursoLivre');
    }

    listarCursoLivre(): Observable<CursoLivre[]> {
        const url = this.baseURL + '/ListarCursosLivres';

        return this.http.get<CursoLivre[]>(url);
    }

    buscarTurmaCursoLivrePorId(id: number): Observable<TurmaCursoLivre> {
        const url = this.baseURL + `/BuscarTurmaCursoLivrePorId/${id}`;

        return this.http.get<TurmaCursoLivre>(url);
    }

    pesquisarTurmasCursoLivre(filtro: FiltroCursoLivre): Observable<TurmaCursoLivre[]> {
        const url = this.baseURL + `/FiltrarTurmasCursoLivre`;

        return this.http.post<TurmaCursoLivre[]>(url, filtro);
    }
    
    salvarTurmaCursoLivre(turma: TurmaCursoLivre): Observable<TurmaCursoLivre> {
        const url = this.baseURL + `/SalvarTurmaCursoLivre`;

        return this.http.post<TurmaCursoLivre>(url, turma);
    }

    deletarTurmaCursoLivre(id: number): Observable<boolean> {
        const url = this.baseURL + `/DeletarTurmaCursoLivre/${id}`;

        return this.http.delete<boolean>(url);
    }

    pesquisarAlunoCursoLivre(nome: string): Observable<AlunoCursoLivre[]> {
        const url = this.baseURL + `/PesquisarAlunoCursoLivre/${nome}`;

        return this.http.get<AlunoCursoLivre[]>(url);
    }

    vincularAlunoCursoLivre(participacao: ParticipacaoCursoLivre): Observable<boolean> {
        const url = this.baseURL + `/VincularAlunoCursoLivre`;

        return this.http.post<boolean>(url, participacao);
    }

    removerParticipacaoCursoLivre(participacao: ParticipacaoCursoLivre): Observable<boolean> {
        const url = this.baseURL + `/RemoverParticipacaoCursoLivre`;

        return this.http.post<boolean>(url, participacao);
    }
}