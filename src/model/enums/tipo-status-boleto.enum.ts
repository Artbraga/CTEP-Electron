import { SelectItem } from 'src/app/custom-components/custom-select/custom-select.component';

export class TipoStatusBoletoEnum {
    public static EmAberto =  { name: 'Em Aberto', value: 1 };
    public static Baixado = { name: 'Baixado', value: 2 };
    public static Liquidado = { name: 'Liquidado', value: 3 };
    public static Negativado = { name: 'Negativado', value: 4 };
    public static Outro = { name: 'Outro', value: 9 };

    public static List(): SelectItem<number>[] {
        return [
            TipoStatusBoletoEnum.EmAberto,
            TipoStatusBoletoEnum.Baixado,
            TipoStatusBoletoEnum.Liquidado,
            TipoStatusBoletoEnum.Negativado,
            TipoStatusBoletoEnum.Outro
        ];
    }

}
