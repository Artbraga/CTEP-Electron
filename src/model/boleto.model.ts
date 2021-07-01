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

    get valorStr(): string {
        return this.valorComoString(this.valor);
    }
    get valorPagoStr(): string {
        return this.valorComoString(this.valorPago);
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

    private valorComoString(valor: number) {
        if (valor == null) {
            return '';
        }
        const casas = valor.toString().split('.');
        if (casas.length == 1) {
            return `R$ ${casas[0]},00`;
        } else {
            let decimal = casas [1].substring(0, 2);
            if (decimal.length == 1) { decimal += '0'; }
            return `R$ ${casas[0]},${decimal}`;
        }
    }
}