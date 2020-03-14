export class BaseConverter {
    public static DateToString(data: Date) {
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

    public static DateToStringOnlyDate(data: Date) {
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
}
