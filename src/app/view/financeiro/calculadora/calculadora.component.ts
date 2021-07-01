import { Component, Inject, OnInit, Optional } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boleto } from 'src/model/boleto.model';

@Component({
    selector: 'calculadora',
    templateUrl: './calculadora.component.html',
    styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {
    moneyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        requireDecimal: true
    });
    percentMask = createNumberMask({
        prefix: '',
        suffix: '%',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        requireDecimal: true
    });

    valor: string;
    juros: string;
    multa: string;
    vencimento: Date;
    dataPagamento: Date;

    valorJuros: number;
    valorMulta: number;
    valorTotal: number;
    modal: boolean;

    constructor(private notificationService: NotificationService,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: Boleto) { }

    ngOnInit(): void {
        this.limpar();
        if (this.data != null) {
            console.log(this.data);
            this.modal = true;
            this.valor = this.data.valor.toString();
            this.juros = this.data.valorJuros.toString().replace('.', ',');
            this.multa = this.data.percentualMulta.toString();
            this.vencimento = this.data.dataVencimento;
            this.calcular();
        }
    }

    calcular() {
        if (this.vencimento == null) {
            this.notificationService.addNotification('Erro ao calcular.', 'Insira uma data de vencimento.', NotificationType.Error);
            return;
        }
        const dias = this.dateDiffInDays(new Date(this.vencimento), new Date(this.dataPagamento));
        const valorNumber = this.lerValor(this.valor);
        this.valorJuros = 0;
        this.valorMulta = 0;
        if (dias > 0) {
            if (this.multa != null) {
                const multaNumber = this.lerValor(this.multa);
                this.valorMulta = (multaNumber / 100) * valorNumber;
            }
            if (this.juros != null) {
                const jurosNumber = this.lerValor(this.juros);
                this.valorJuros = jurosNumber * dias;
            }
        }
        this.valorTotal = valorNumber + this.valorJuros + this.valorMulta;
    }

    lerValor(valor: string): number {
        return Number.parseFloat(valor.replace('R$ ', '').replace('%', '').replace(',', '.'));
    }

    valorComoString(valor: number) {
        if (valor == null) {
            return 'R$ 0,00';
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

    limpar() {
        this.valor = 'R$0,00';
        this.juros = null;
        this.multa = null;
        this.valorTotal = null;
        this.valorJuros = 0;
        this.valorMulta = 0;
        this.vencimento = null;
        this.dataPagamento = new Date();
    }


    dateDiffInDays(a: Date, b: Date): number {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

}
