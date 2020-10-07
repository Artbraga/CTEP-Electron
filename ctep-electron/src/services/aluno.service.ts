import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../model/aluno.model';
import { Observable } from 'rxjs';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { TurmaAluno } from '../model/turma-aluno.model';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }

    gerarNumeroDeMatricula(cursoId: number, anoMatricula: number): Observable<string> {
        const url = this.baseURL + `/GerarNumeroDeMatricula?cursoId=${cursoId}&anoMatricula=${anoMatricula}`;

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
        formData.append(imagemPerfil.name, imagemPerfil);
        formData.append("idAluno", id.toString());

        return this.http.post<boolean>(url, formData);
    }

}
