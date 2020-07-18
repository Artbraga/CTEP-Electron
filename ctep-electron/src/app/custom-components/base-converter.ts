export class BaseConverter {
    public static DateToString(data: Date): string {
        if (data == null) {
            return "";
        }
        return `${this.prependZero(data.getDate())}/${this.prependZero(
            data.getMonth() + 1
        )}/${data.getFullYear()} ${this.prependZero(
            data.getHours()
        )}:${this.prependZero(data.getMinutes())}:${this.prependZero(
            data.getSeconds()
        )}`;
    }

    public static DateToStringOnlyDate(data: Date): string {
        return `${this.prependZero(data.getDate())}/${this.prependZero(
            data.getMonth() + 1
        )}/${data.getFullYear()}`;
    }

    private static prependZero(valor) {
        if (valor <= 9) {
            return '0' + valor;
        }
        return valor + '';
    }

    public static StringToDate(value: string) {
        // tslint:disable-next-line: one-variable-per-declaration
        let date, time, dia, mes, ano, hora, minuto, segundo;
        [date, time] = value.split(' ');
        [dia, mes, ano] = date.split('/');
        [hora, minuto, segundo] = time.split(':');

        return new Date(ano, mes - 1, dia, hora, minuto, segundo);
    }

    public static StringToDateOnlyDate(value: string) {
        // tslint:disable-next-line: one-variable-per-declaration
        let dia, mes, ano;
        [dia, mes, ano] = value.split('/');

        return new Date(ano, mes - 1, dia);
    }

    public static resolveField(obj: any, field: string): any {
        if (field == null || field.trim() === '') { return null; }
        let fields = field.split('.');
        if (fields.length > 1) {
            const campo = fields[0];
            fields = fields.slice(1);
            if (obj[campo] != null) {
                return this.resolveField(obj[campo], fields.join('.'));
            }
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        return obj[field];
    }
}
