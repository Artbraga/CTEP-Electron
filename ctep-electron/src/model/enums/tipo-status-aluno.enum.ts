import { SelectItem } from 'src/app/custom-components/custom-select/custom-select.component';

export class TipoStatusAlunoEnum {
    public static Ativo =  { name: "Ativo", value: 1 };
    public static Concluido = { name: "Concluído", value: 2 };
    public static Trancado = { name: "Trancado", value: 3 };
    public static Abandono = { name: "Abandono", value: 4 };

    public static List(): SelectItem<number>[] {
        return [
            TipoStatusAlunoEnum.Ativo,
            TipoStatusAlunoEnum.Concluido,
            TipoStatusAlunoEnum.Trancado,
            TipoStatusAlunoEnum.Abandono
        ];
    }

}
