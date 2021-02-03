import { BaseConverter } from 'src/app/custom-components/base-converter';

export class RegistroTurma {
    data: Date;
    turmaId: number;
    registro: string;

    get dataStr(): string {
        return BaseConverter.DateToStringOnlyDate(new Date(this.data));
    }

}
