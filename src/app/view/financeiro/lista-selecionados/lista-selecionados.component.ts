import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BaseTable, Coluna } from "src/app/custom-components/base-table";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { Boleto } from "src/model/boleto.model";
import { BoletosConstant as BoletosConstant } from "src/model/enums/constants";
import { FinanceiroService } from "src/services/financeiro.service";
import { MemoryListService } from "src/services/memory-list.service";

@Component({
    selector: "app-lista-selecionados",
    templateUrl: "./lista-selecionados.component.html",
    styleUrls: ["./lista-selecionados.component.scss"],
})
export class ListaSelecionadosComponent
    extends BaseTable<Boleto>
    implements OnInit
{
    get linhasSelecionadas() {
        return this.listService.buscarLista(BoletosConstant);
    }

    constructor(
        private dialogRef: MatDialogRef<ListaSelecionadosComponent>,
        public financeiroService: FinanceiroService,
        private notificationService: NotificationService,
        public listService: MemoryListService
    ) {
        super();
    }

    ngOnInit() {
        this.columns.push({
            key: "nome",
            header: "Nome",
            field: "aluno.nome",
        } as Coluna);
        this.columns.push({
            key: "seuNumero",
            header: "Número",
            field: "seuNumero",
        } as Coluna);
        this.columns.push({
            key: "vencimento",
            header: "Vencimento",
            field: "dataVencimentoStr",
        } as Coluna);
        this.columns.push({
            key: "valor",
            header: "Valor",
            field: "valorStr",
        } as Coluna);
        this.columns.push({
            key: "pagamento",
            header: "Data do Pagamento",
            field: "dataPagamentoStr",
        } as Coluna);
        this.columns.push({
            key: "valorPago",
            header: "Valor Pago",
            field: "valorPagoStr",
        } as Coluna);
        this.columns.push({
            key: "status",
            header: "Situação",
            field: "status",
        } as Coluna);
        this.columns.push({
            key: "buttons",
            bodyTemplateName: "acoesTemplate",
        } as Coluna);
    }

    remover(boleto: Boleto) {
        this.listService.remover(boleto, BoletosConstant);
    }

    closeModal(recarregar: boolean) {
        this.dialogRef.close(recarregar);
    }

    excluir() {
        this.financeiroService
            .excluirBoletos(this.linhasSelecionadas.map((x) => x.id))
            .subscribe((data) => {
                if (data) {
                    this.listService.limpar(BoletosConstant);
                    this.notificationService.addNotification(
                        "Sucesso!",
                        "Boletos excluídos com sucesso.",
                        NotificationType.Success
                    );

                    this.closeModal(true);
                }
            });
    }
}
