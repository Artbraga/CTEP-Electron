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
    selector: "pagamentos-mes",
    templateUrl: "./pagamentos-mes.component.html",
    styleUrls: ["./pagamentos-mes.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class PagamentosMesComponent implements OnInit {
    dataSelecionada: Date;
    filter: RelatorioMensalFilter;
    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.dataSelecionada = new Date();

        this.buscar();
    }

    public pieChartData: number[] = [0, 0, 0];
    public pieChartLabels: string[] = ["Em Aberto", "Pago", "Negativado"];

    public chartClicked(e: any): void {}

    public chartHovered(e: any): void {}

    buscar(): void {
        this.filter = new RelatorioMensalFilter();
        this.filter.dataInicio = new Date(this.dataSelecionada);
        this.filter.dataInicio.setDate(1);
        this.filter.dataFim = new Date(this.dataSelecionada);
        this.filter.dataFim.setDate(1);
        this.filter.dataFim.setMonth(this.dataSelecionada.getMonth() + 1);
        this.filter.dataFim.setDate(this.filter.dataFim.getDate() - 1);

        this.financeiroService.pagamentos(this.filter).subscribe((data) => {
            this.pieChartData = [
                data.valorAberto,
                data.valorPago,
                data.valorNegativado,
            ];
            console.log(this.pieChartData);
        });
    }

    chosenYearHandler(normalizedYear: Moment) {
        this.dataSelecionada.setFullYear(normalizedYear.year());
        this.dataSelecionada = new Date(this.dataSelecionada);
    }

    chosenMonthHandler(
        normalizedMonth: Moment,
        datepicker: MatDatepicker<Moment>
    ) {
        this.dataSelecionada.setMonth(normalizedMonth.month());
        this.dataSelecionada = new Date(this.dataSelecionada);
        datepicker.close();
    }
}
