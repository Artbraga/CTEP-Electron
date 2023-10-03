import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { PageTableResult } from "src/app/custom-components/page-table-result";
import { Boleto } from "src/model/boleto.model";
import {
    BoletosConstant,
    FiltroBoletoParameter,
} from "src/model/enums/constants";
import { FiltroBoleto } from "src/model/filters/boleto.filter";
import { BaixarArquivoService } from "src/services/application-services/baixarArquivo.service";
import { FinanceiroService } from "src/services/financeiro.service";
import { RoutingService } from "src/services/routing.service";
import { ListaSelecionadosComponent } from "../lista-selecionados/lista-selecionados.component";
import { MemoryListService } from "src/services/memory-list.service";

@Component({
    selector: "app-consulta-boleto",
    templateUrl: "./consulta-boleto.component.html",
    styleUrls: ["./consulta-boleto.component.scss"],
})
export class ConsultaBoletoComponent implements OnInit {
    filtro: FiltroBoleto;
    pageList: PageTableResult<Boleto>;

    selecaoHabilitada: boolean = false;

    get linhasSelecionadas() {
        return this.listService.buscarLista(BoletosConstant);
    }

    constructor(
        private financeiroService: FinanceiroService,
        private baixarArquivoService: BaixarArquivoService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        public dialog: MatDialog,
        public listService: MemoryListService
    ) {}

    ngOnInit(): void {
        if (this.routingService.possuiValor(FiltroBoletoParameter)) {
            this.filtro = this.routingService.buscarValor(
                FiltroBoletoParameter
            );
            this.pesquisar();
        } else {
            this.filtro = new FiltroBoleto();
        }
        this.pageList = new PageTableResult<Boleto>();
    }

    pesquisar(filtro: FiltroBoleto = null) {
        if (filtro != null) {
            this.filtro = filtro;
            this.routingService.salvarValor(FiltroBoletoParameter, this.filtro);
        }
        this.financeiroService.filtrarBoletos(this.filtro).subscribe((data) => {
            this.pageList = data;
            this.pageList.lista = data.lista.map((x) => {
                const boleto = Object.assign(new Boleto(), x);
                boleto.corrigirInformacoes();
                return boleto;
            });
        });
    }

    exportarPesquisa() {
        if (this.pageList.lista == null || this.pageList.lista.length == 0) {
            this.notificationService.addNotification(
                "Atenção",
                "A pesquisa não possui resultados a serem exportados.",
                NotificationType.Warnning
            );
            return;
        }

        this.financeiroService.baixarPesquisa(this.filtro).subscribe(
            (data) => {
                if (data) {
                    this.baixarArquivoService.downloadFile(
                        data,
                        "exportação_financeiro.xlsx",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                }
            },
            (err) => {
                this.notificationService.addNotification(
                    "Erro",
                    "Erro ao baixar a pesquisa!",
                    NotificationType.Error
                );
            }
        );
    }

    paginar(pagina: number) {
        this.filtro.pagina = pagina;
        this.pesquisar(this.filtro);
    }

    habilitarSelecao() {
        this.selecaoHabilitada = !this.selecaoHabilitada;
        this.listService.limpar(BoletosConstant);
    }

    verSelecionados() {
        this.dialog
            .open(ListaSelecionadosComponent)
            .afterClosed()
            .subscribe((res) => {
                if (res) this.pesquisar();
            });
    }
}
