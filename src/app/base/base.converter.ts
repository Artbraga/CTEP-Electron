export class BaseConverter {
    public static convertDateTime(date: any): string {
        return date == undefined || typeof (date) == typeof ('')
            ? date
            : this.getDate(date) + '/' + this.getMonth(date) + '/' + date.getFullYear() + ' ' + this.getHours(date) + ':' + this.getMinutes(date) + ':' + this.getSeconds(date);
    };
    public static convertDateTimeWithoutSeconds(date: any): string {
        return date == undefined || typeof (date) == typeof ('')
            ? date
            : this.getDate(date) + '/' + this.getMonth(date) + '/' + date.getFullYear() + ' ' + this.getHours(date) + ':' + this.getMinutes(date);
    };
    public static convertDate(date: any): string {
        return date == undefined || typeof (date) == typeof ('')
            ? date
            : this.getDate(date) + '/' + this.getMonth(date) + '/' + date.getFullYear();
    };

    public static convertDateToSave(date: any): string {
        return date == undefined || typeof (date) == typeof ('')
            ? date
            : date.getFullYear() + '-' + this.getMonth(date) + '-' + this.getDate(date);
    }; 

    public static convertDateEn(date: any): string {
        return date == undefined
            ? null
            : typeof (date) == typeof ('')
                ? date == '' ? date : this.convertStringDateEn(date)
                : this.getMonth(date) + '/' + this.getDate(date) + '/' + date.getFullYear();
    };
    private static convertStringDateEn(date: any): string {
        let dateSplit = date.split('/');
        let dateEn = dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
        let dateInt = new Date(dateEn);

        if (!isNaN(dateInt.valueOf())) {
            return this.getMonth(dateInt) + '/' + this.getDate(dateInt) + '/' + dateInt.getFullYear();
        }

        return '';
        
    };
    public static convertDateTimeEn(date: any): string {
        return date == undefined
            ? null
            : typeof (date) == typeof ('')
                ? date == '' ? date : this.convertStringDateTimeEn(date)
                : this.getMonth(date) + '/' + this.getDate(date) + '/' + date.getFullYear() + ' ' + this.getHours(date) + ':' + this.getMinutes(date) + ':' + this.getSeconds(date);
    };
    private static convertStringDateTimeEn(date: any): string {
        let dateSplit = date.split('/');
        let dateEn = dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
        
        let dateInt = new Date(dateEn);

        if (!isNaN(dateInt.valueOf())) {
            return this.getMonth(dateInt) + '/' + this.getDate(dateInt) + '/' + dateInt.getFullYear() + ' ' + this.getHours(dateInt) + ':' + this.getMinutes(dateInt) + ':' + this.getSeconds(dateInt);
        }

        return '';
    };

    public static getDate(date: Date): string | number {
        return date.getDate() < 10
            ? '0' + date.getDate()
            : date.getDate();
    };

    public static getMonth(date: Date): string | number  {
        return date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1;
    };

    public static getHours(date: Date): string | number  {
        return date.getHours() < 10
            ? '0' + date.getHours()
            : date.getHours();
    };

    public static getMinutes(date: Date): string | number  {
        return date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes();
    };

    public static getSeconds(date: Date): string | number  {
        return date.getSeconds() < 10
            ? '0' + date.getSeconds()
            : date.getSeconds();
    };

    public static convertStringDateTimeBRToDate(d: string): any {
        if (typeof (d) != typeof ("")) return d;
        if (d.trim() == "" || d == null) return null;
        let splitDataHora = d.split(" ");
        let splitHora = splitDataHora[1].split(":");
        let splitData = splitDataHora[0].split('/');
        return new Date(+splitData[2], +splitData[1] - 1, +splitData[0], +splitHora[0], +splitHora[1], +splitHora[2], 0); // O mês está menos um por que o construtor interpreta Janeiro como 0 e assim por diante.
    }

    public static convertStringDateBRToDate(d: string): any {
        if (typeof (d) != typeof ("")) return d;
        if (d.trim() == "" || d == null) return null;
        let splitData = d.split('-');
        return new Date(+splitData[0], +splitData[1] - 1, +splitData[2]); // O mês está menos um por que o construtor interpreta Janeiro como 0 e assim por diante.
    }

    public static getNewImageSize(size:number[]):number[] {
        let newSize = [1280, 720] // Max Size
        if (size[1] > size[0]) {
            let temp = newSize[0]
            newSize[0] = newSize[1]
            newSize[1] = temp;
        }
        if (size[0] > newSize[0] || size[1] > newSize[1]) {
            let r = Math.max(size[0] / newSize[0], size[1] / newSize[1]);
            newSize = [Math.round(size[0] / r), Math.round(size[1] / r)];
        } else {
            newSize = size;
        }
        return newSize;
    }
}
