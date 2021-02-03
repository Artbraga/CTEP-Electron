import { Turma } from "./turma";
import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export class Curso{
    id: number;
    nome: string;
    sigla: string;
    siglaTurma: string;
    especializacao: boolean;
    cursoVinculado: Curso;

    disciplinas: Disciplina[];
    turmas: Turma[];
    alunos: Aluno[];
    especializacoes: Curso[];

    constructor(){
        this.id = null;
        this.nome = null;
        this.sigla = null;
        this.siglaTurma = null;
        this.especializacao = null;
        this.cursoVinculado = null;
    
        this.disciplinas = [];
        this.turmas = [];
        this.alunos = [];
        this.especializacoes = [];
    }
}