import { BaseConverter } from '../app/custom-components/base-converter';
import { Curso } from './curso.model';

export class Turma {
    id: number;
    codigo: string;
    diasDaSemana: string;
    horaInicio: string;
    horaFim: string;
    dataInicio: Date;
    dataFim: Date;
    curso: Curso;

    anoInicio: number;

    get dataInicioStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataInicio);
    }

    get horario(): string {
        return this.horaInicio + ' - ' + this.horaFim;
    }

    constructor() {
        this.codigo = null;
        this.diasDaSemana = null;
        this.horaInicio = null;
        this.horaFim = null;
        this.dataInicio = null;
        this.dataFim = null;
        this.curso = null;

        this.anoInicio = null;
    }
}
