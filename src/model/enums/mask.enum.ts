export class MaskPatterns {
    public static CPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    public static Telefone = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public static Celular = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public static CEP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    public static Data = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    public static Hora = [/\d/, /\d/, ':', /\d/, /\d/];
    public static Valor = ['R', '$', /\d+/, ',', /\d/, /\d/];
    public static Nota = [/[0,1]?/, /\d/, ',', /\d*/];
}
