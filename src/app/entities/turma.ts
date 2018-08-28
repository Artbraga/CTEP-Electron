import { Curso } from "./curso";
import { Aluno } from "./aluno";
import { Professor } from "./professor";
import { ObservacaoTurma } from "./observacaoTurma";
import { BaseConverter } from "src/app/base/base.converter";

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

    static fromArray(data: any[]): Turma[]{
        let turmas = [];
        data.forEach(d => {
            let t = new Turma();
            t.codigo = d.codigo;
            t.diasDaSemana = d.diasDaSemana;
            t.horaInicio = d.horaInicio;
            t.horaFim = d.horaFim;
            t.curso = d.curso;
            t.dataInicio = <Date> d.dataInicio;
            turmas.push(t);
        });
        return turmas;
    }

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