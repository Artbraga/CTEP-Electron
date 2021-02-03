import { Curso } from "./curso";
import { Aluno } from "./aluno";
import { Professor } from "./professor";
import { ObservacaoTurma } from "./observacaoTurma";
import { BaseConverter } from "src/app/base/base-converter";

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

    get dataInicioStr(): string{
        return BaseConverter.convertDate(this.dataInicio);
    }

    get horario(): string{
        return this.horaInicio + ' - ' + this.horaFim;
    }

    constructor() {
        this.codigo = null;
        this.diasDaSemana = null;
        this.horaInicio = null;
        this.horaFim = null;
        this.dataInicio = null;
        this.dataFim = null;
        this.status = 1;
        this.curso = null;

        this.anoInicio = null;

        this.professores = [];
        this.observacoes = [];
        this.alunos = [];
    }
}