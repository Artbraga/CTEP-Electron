import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../model/aluno.model';
import { Observable } from 'rxjs';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { TurmaAluno } from '../model/turma-aluno.model';
import { RegistroAluno } from 'src/model/registro-aluno.model';
import { MudancaSituacao } from '../model/mudanca-situacao.model';
import { PageTableResult } from '../app/custom-components/page-table-result';
import { AlunoNotas } from '../model/aluno-notas.entity';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }

    gerarNumeroDeMatricula(cursoId: number, anoMatricula: number): Observable<string> {
        const url = this.baseURL + `/GerarNumeroDeMatricula/${cursoId}/${anoMatricula}`;

        return this.http.get(url, { responseType: 'text' });
    }

    pesquisarAlunos(filtro: FiltroAluno): Observable<PageTableResult<Aluno>> {
        const url = this.baseURL + `/FiltrarAlunos`;

        return this.http.post<PageTableResult<Aluno>>(url, filtro);
    }

    baixarPesquisa(filtro: FiltroAluno): Observable<any> {
        const url = this.baseURL + `/BaixarPesquisa`;

        return this.http.post(url, filtro);
    }

    gerarCracha(idTurmaAluno: number): Observable<any> {
        const url = this.baseURL + `/GerarCracha/${idTurmaAluno}`;

        return this.http.get(url);
    }

    gerarHistorico(idTurmaAluno: number): Observable<any> {
        const url = this.baseURL + `/GerarHistorico/${idTurmaAluno}`;

        return this.http.get(url);
    }


    vincularAlunoTurma(turmaAluno: TurmaAluno): Observable<boolean> {
        const url = this.baseURL + `/VincularAlunoTurma`;

        return this.http.post<boolean>(url, turmaAluno);
    }

    alterarSituacao(mudancaSituacao: MudancaSituacao): Observable<boolean> {
        const url = this.baseURL + `/AlterarSituacao`;

        return this.http.post<boolean>(url, mudancaSituacao);
    }

    buscarAlunosENotasDeTurma(turmaId: number): Observable<AlunoNotas[]> {
        const url = this.baseURL + `/BuscarAlunosENotasDeTurma/${turmaId}`;

        return this.http.get<AlunoNotas[]>(url);
    }

    salvarImagem(id: number, imagemPerfil: File): Observable<boolean> {
        const url: string = this.baseURL + '/SalvarImagemAluno';

        const formData = new FormData();
        formData.append('imagemPerfil', imagemPerfil);
        formData.append('idAluno', id.toString());

        return this.http.post<boolean>(url, formData);
    }

    buscarImagem(id: number): Observable<Blob> {
        const url = this.baseURL + `/BuscarImagemAluno/${id}`;

        return this.http.get(url, { responseType: 'blob' });
    }

    // registro
    public adicionarRegistro(registro: RegistroAluno): Observable<boolean> {
        const url = this.baseURL + `/AdicionarRegistro`;

        return this.http.post<boolean>(url, registro);
    }

    public excluirRegistro(id: number): Observable<boolean> {
        const url = this.baseURL + '/ExcluirRegistro/' + id;

        return this.http.delete<boolean>(url);
    }

}
