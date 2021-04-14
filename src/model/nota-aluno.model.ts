import { Disciplina } from './disciplina.model';

export class NotaAluno {
    valorNota: number;
    alunoId: number;
    disciplinaId: number;
    professorId: number;
    disciplina: Disciplina;
}
