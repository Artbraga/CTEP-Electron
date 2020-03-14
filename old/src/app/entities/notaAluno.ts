import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export class NotaAluno{
    id: number;
    nota: number;
    aluno: Aluno;
    disciplina: Disciplina;

    constructor(){
        this.id = null;
        this.aluno = null;
        this.disciplina = null;
        this.nota = null;
    }
}