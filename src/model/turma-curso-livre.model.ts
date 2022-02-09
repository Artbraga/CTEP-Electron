import { BaseConverter } from "src/app/custom-components/base-converter";
import { CursoLivre } from "./curso-livre.model";
import { ParticipacaoCursoLivre } from "./participacao-curso-livre.model";

export class TurmaCursoLivre {
    public id: number;
    public data: Date;
    public horaInicio: string;
    public horaFim: string;
    public curso: CursoLivre;
    public participacoesCursoLivre: ParticipacaoCursoLivre[] = [];

    get horario(): string {
        return this.horaInicio + ' - ' + this.horaFim;
    }

    get dataStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.data);
    }

    ajustarDatas() {
        this.data = BaseConverter.StringToDate(this.data.toString());
    }
}