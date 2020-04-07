export class MaskPatterns {
    public static CPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/];
    public static Telefone = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public static Celular = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public static CEP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
}
