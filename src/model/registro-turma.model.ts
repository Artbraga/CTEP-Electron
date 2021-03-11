import { BaseConverter } from 'src/app/custom-components/base-converter';

export class RegistroTurma {
    id: number;
    data: Date;
    turmaId: number;
    registro: string;

    get dataStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.data);
    }

    ajustarDatas() {
        this.data = BaseConverter.StringToDate(this.data.toString());
    }

}
