import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormularioComponent } from 'src/app/base/base-formulario.component';
import { SelectItem } from 'src/app/custom-components/custom-select/custom-select.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { Boleto } from 'src/model/boleto.model';
import { TipoStatusAlunoEnum } from 'src/model/enums/tipo-status-aluno.enum';
import { TipoStatusBoletoEnum } from 'src/model/enums/tipo-status-boleto.enum';
import { TurmaAluno } from 'src/model/turma-aluno.model';
import { AlunoService } from 'src/services/aluno.service';
import { FinanceiroService } from 'src/services/financeiro.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { TurmaAlunoComponent } from '../../aluno/turma-aluno/turma-aluno.component';

@Component({
    selector: 'app-alterar-situacao',
    templateUrl: './alterar-situacao.component.html',
    styleUrls: ['./alterar-situacao.component.scss']
})
export class AlterarSituacaoComponent implements OnInit {

    moneyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        requireDecimal: true
    });
    
    tiposStatusBoletoOptions: SelectItem<number>[];
    tipoStatusBoletoSelecionado: SelectItem<number>;
    data = new Date();
    valor: string;

    constructor(private financeiroService: FinanceiroService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<TurmaAlunoComponent>,
        @Inject(MAT_DIALOG_DATA) public boleto: Boleto) {
    }

    ngOnInit(): void {
        this.buscarStatus();
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.boleto.status = this.tipoStatusBoletoSelecionado.name;
                if (this.ehBaixa()) {
                    this.boleto.dataPagamento = this.data;
                    this.boleto.valorPago = null;
                } else if (this.ehLiquidacao()) {
                    this.boleto.dataPagamento = this.data;
                    this.boleto.valorPago = this.lerValor(this.valor);
                }
                this.financeiroService.alterarStatusBoleto(this.boleto).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Situação do boleto alterada com sucesso.', NotificationType.Success);
                        this.dialogRef.close(true);
                    }
                });
            }
        } else {
            this.dialogRef.close(false);
        }
    }

    buscarStatus() {
        this.tipoStatusBoletoSelecionado = null;
        switch (this.boleto.status) {
            case TipoStatusBoletoEnum.EmAberto.name: {
                this.tiposStatusBoletoOptions = [
                    TipoStatusBoletoEnum.Baixado,
                    TipoStatusBoletoEnum.Liquidado,
                    TipoStatusBoletoEnum.Negativado
                ];
                break;
            }
            case TipoStatusBoletoEnum.Baixado.name: {
                this.tiposStatusBoletoOptions = [
                    TipoStatusBoletoEnum.Liquidado,
                    TipoStatusBoletoEnum.Negativado
                ];
                break;
            }
            case TipoStatusBoletoEnum.Negativado.name: {
                this.tiposStatusBoletoOptions = [
                    TipoStatusBoletoEnum.Baixado,
                    TipoStatusBoletoEnum.Liquidado,
                ];
                break;
            }
        }
    }

    ehNegativacao() {
        return this.tipoStatusBoletoSelecionado == TipoStatusBoletoEnum.Negativado;
    }

    ehLiquidacao() {
        return this.tipoStatusBoletoSelecionado == TipoStatusBoletoEnum.Liquidado;
    }

    ehBaixa() {
        return this.tipoStatusBoletoSelecionado == TipoStatusBoletoEnum.Baixado;
    }

    validar(): boolean {
        let valido = true;
        if (this.tipoStatusBoletoSelecionado == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'Selecione uma nova situação para o boleto.', NotificationType.Error);
        }
        if (this.ehBaixa() && this.data == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'A data da baixa do boleto é obrigatória.', NotificationType.Error);
        }
        if (this.ehLiquidacao() && (this.data == null || !this.valorValido())) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'A data do pagamento e o valor pago são obrigatórios.', NotificationType.Error);
        }
        return valido;
    }

    valorValido(): boolean {
        if (this.valor == null) return false;
        const valor = this.lerValor(this.valor);
        return !Number.isNaN(valor) && valor > 0;
    }

    lerValor(valor: string): number {
        return Number.parseFloat(valor.replace('R$ ', '').replace('%', '').replace(',', '.'));
    }
}