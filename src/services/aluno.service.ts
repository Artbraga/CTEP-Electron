import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../model/aluno.model';
import { Observable } from 'rxjs';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { TurmaAluno } from '../model/turma-aluno.model';
import { RegistroAluno } from 'src/model/registro-aluno.model';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }

    gerarNumeroDeMatricula(cursoId: number, anoMatricula: number): Observable<string> {
        const url = this.baseURL + `/GerarNumeroDeMatricula/${cursoId}/${anoMatricula}`;

        return this.http.get(url, { responseType: 'text' });
    }

    pesquisarAlunos(filtro: FiltroAluno): Observable<Aluno[]> {
        const url = this.baseURL + `/FiltrarAlunos`;

        return this.http.post<Aluno[]>(url, filtro);
    }

    vincularAlunoTurma(turmaAluno: TurmaAluno): Observable<boolean> {
        const url = this.baseURL + `/VincularAlunoTurma`;

        return this.http.post<boolean>(url, turmaAluno);
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
