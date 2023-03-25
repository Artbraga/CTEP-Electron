import { BaseConverter } from "src/app/custom-components/base-converter";
import { Boleto } from "./boleto.model";
import { RegistroRetorno } from "./registro-retorno.model";

export class RetornoArquivo {
    numero: string;
    tipo: string
    dataReferencia: Date;
    dataLeitura: Date;
    registros: RegistroRetorno[];
    movimentacoes: Boleto[];

    get dataReferenciaStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataReferencia);
    }

    get dataLeituraStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataLeitura);
    }

    corrigirInformacoes() {
        if (this.dataReferencia != null) {
            this.dataReferencia = BaseConverter.StringToDate(this.dataReferencia.toString());
        }
        if (this.dataLeitura != null) {
            this.dataLeitura = BaseConverter.StringToDate(this.dataLeitura.toString());
        }
        this.movimentacoes = this.movimentacoes.map(b => {
            let boleto = Object.assign(new Boleto(), b)
            boleto.corrigirInformacoes()
            return boleto;
        }).sort((a, b) => a.aluno.nome > b.aluno.nome ? 1 : -1);
    }
}