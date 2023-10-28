import { Component, OnInit } from "@angular/core";
import { BaseConverter } from "src/app/custom-components/base-converter";
import { RelatorioMensalFilter } from "src/model/filters/relatorio-mensal.filter";
import { FinanceiroService } from "src/services/financeiro.service";

@Component({
    selector: "faturamento",
    templateUrl: "./faturamento.component.html",
    styleUrls: ["./faturamento.component.scss"],
})
export class FaturamentoComponent implements OnInit {
    filter: RelatorioMensalFilter;
    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.filter = new RelatorioMensalFilter();
        this.filter.dataFim = new Date();
        this.filter.dataFim.setMonth(new Date().getMonth() + 6);
        this.filter.dataInicio = new Date();
        this.filter.dataInicio.setMonth(new Date().getMonth() - 6);

        this.buscar();
    }

    public SystemName: string = "MF1";
    firstCopy = false;

    public dataSet: Array<any> = [
        {
            data: 0,
            stack: "1",
            label: "Pago",
        },
        {
            data: 0,
            stack: "1",
            label: "Em Aberto",
        },
        {
            data: 0,
            stack: "1",
            label: "Negativado",
        },
    ];

    public lineChartLabels: Array<any> = [];

    public lineChartOptions: any = {
        responsive: true,
        scales: {},
        plugins: {
            datalabels: {
                display: true,
                align: "top",
                anchor: "end",
                //color: "#2756B3",
                color: "#222",

                font: {
                    family: "FontAwesome",
                    size: 14,
                },
            },
            deferred: false,
        },
    };

    public chartClicked(e: any): void {
        console.log(e);
    }
    public chartHovered(e: any): void {
        console.log(e);
    }

    buscar(): void {
        this.financeiroService
            .relatorioMensal(this.filter)
            .subscribe((data) => {
                this.lineChartLabels = data.map((x) => x.mesAno);
                this.dataSet[0].data = data.map((x) => x.valorPago);
                this.dataSet[1].data = data.map((x) => x.valorAberto);
                this.dataSet[2].data = data.map((x) => x.valorNegativado);
            });
    }
}
