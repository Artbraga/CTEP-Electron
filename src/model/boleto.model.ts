import { BaseConverter } from "src/app/custom-components/base-converter";
import { Aluno } from "./aluno.model";

export class Boleto {
    id: number;
    seuNumero: string;
    nossoNumero: string;
    dataVencimento: Date;
    valor: number;
    dataEmissao?: Date;
    dataPagamento?: Date;
    valorPago?: number;
    valorJuros?: number;
    percentualMulta?: number;
    status: string;

    aluno: Aluno;
    
    get dataEmissaoStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataEmissao);
    }
    get dataVencimentoStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataVencimento);
    }
    get dataPagamentoStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataPagamento);
    }

    corrigirInformacoes() {
        if (this.dataVencimento != null) {
            this.dataVencimento = BaseConverter.StringToDate(this.dataVencimento.toString());
        }
        if (this.dataEmissao != null) {
            this.dataEmissao = BaseConverter.StringToDate(this.dataEmissao.toString());
        }
        if (this.dataPagamento != null) {
            this.dataPagamento = BaseConverter.StringToDate(this.dataPagamento.toString());
        }
    }
}