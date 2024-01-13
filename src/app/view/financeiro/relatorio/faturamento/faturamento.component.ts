import { Component, OnInit } from "@angular/core";
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { Moment } from "moment";
import { RelatorioMensalFilter } from "src/model/filters/relatorio-mensal.filter";
import { FinanceiroService } from "src/services/financeiro.service";

export const MY_FORMATS = {
    parse: {
        dateInput: "MM/YYYY",
    },
    display: {
        dateInput: "MM/YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
    },
};

@Component({
    selector: "faturamento",
    templateUrl: "./faturamento.component.html",
    styleUrls: ["./faturamento.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class FaturamentoComponent implements OnInit {
    filter: RelatorioMensalFilter;
    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.filter = new RelatorioMensalFilter();
        this.filter.dataFim = new Date();
        this.filter.dataFim.setDate(1);
        this.filter.dataFim.setMonth(new Date().getMonth() + 6);
        this.filter.dataFim.setDate(this.filter.dataFim.getDate() - 1);
        this.filter.dataInicio = new Date();
        this.filter.dataInicio.setDate(1);
        this.filter.dataInicio.setMonth(new Date().getMonth() - 6);

        this.buscar();
    }

    public SystemName: string = "MF1";
    firstCopy = false;

    public dataSet: Array<any> = [
        {
            data: 0,
            stack: "1",
            label: "Em Aberto",
        },
        {
            data: 0,
            stack: "1",
            label: "Pago",
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
                this.dataSet[0].data = data.map((x) => x.valorAberto);
                this.dataSet[1].data = data.map((x) => x.valorPago);
                this.dataSet[2].data = data.map((x) => x.valorNegativado);
            });
    }

    chosenYearHandler(normalizedYear: Moment, data: string) {
        if (data == "inicio") {
            this.filter.dataInicio.setFullYear(normalizedYear.year());
            this.filter.dataInicio = new Date(this.filter.dataInicio);
        } else if (data == "fim") {
            this.filter.dataFim.setFullYear(normalizedYear.year());
            this.filter.dataFim = new Date(this.filter.dataFim);
        }
    }

    chosenMonthHandler(
        normalizedMonth: Moment,
        datepicker: MatDatepicker<Moment>,
        data: string
    ) {
        if (data == "inicio") {
            this.filter.dataInicio.setMonth(normalizedMonth.month());
            this.filter.dataInicio = new Date(this.filter.dataInicio);
        } else if (data == "fim") {
            this.filter.dataFim.setMonth(normalizedMonth.month() + 1);
            this.filter.dataFim = new Date(this.filter.dataFim.setDate(-1));
        }

        datepicker.close();
    }
}
