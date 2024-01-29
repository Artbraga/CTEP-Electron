export class Utils {
    public static toPascalCase(value: string): string {
        let words = value.split("_");
        let finalWord = "";
        words.forEach((word) => {
            finalWord +=
                word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
        });
        return finalWord;
    }

    public static getDatePart(date: Date) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    public static formatDecimal(input, fixed: number) {
        let newInput = input;
        if (input === undefined) return undefined;
        if (typeof input === "string") newInput = parseFloat(input);
        if (fixed) newInput = parseFloat(String(input)).toFixed(fixed);
        if (input % 1 === 0) newInput = parseInt(newInput, 10);
        newInput = parseFloat(newInput);
        return newInput || 0;
    }

    public static formatMoney(input) {
        let real = Intl.NumberFormat("br-BR", {
            style: "currency",
            currency: "BRL",
        });
        return real.format(input);
    }
}
