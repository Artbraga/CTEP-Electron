import { Disciplina } from './disciplina.model';

export class NotaAluno {
    valorNota: number;
    alunoId: number;
    nomeAluno: string;
    disciplinaId: number;
    professorId: number;
    disciplina: Disciplina;
}
