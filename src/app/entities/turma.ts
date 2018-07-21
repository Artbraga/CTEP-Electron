import { Curso } from "./curso";
import { Aluno } from "./aluno";
import { Professor } from "./professor";
import { ObservacaoTurma } from "./observacaoTurma";

export class Turma {
    codigo: string;
    diasDaSemana: string;
    horaInicio: string;
    horaFim: string;
    dataInicio: Date;
    dataFim: Date;
    status: number;
    curso: Curso;

    anoInicio: number;

    professores: Professor[];
    observacoes: ObservacaoTurma[];
    alunos: Aluno[];

    constructor() {
        this.codigo = null;
        this.diasDaSemana = null;
        this.horaInicio = null;
        this.horaFim = null;
        this.dataInicio = null;
        this.dataFim = null;
        this.status = null;
        this.curso = null;

        this.anoInicio = null;

        this.professores = [];
        this.observacoes = [];
        this.alunos = [];
    }
}