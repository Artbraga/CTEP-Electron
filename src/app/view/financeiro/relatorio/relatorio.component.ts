import { Component, OnInit } from "@angular/core";
import { RelatorioMensalFilter } from "src/model/filters/relatorio-mensal.filter";

@Component({
    selector: "app-relatorio",
    templateUrl: "./relatorio.component.html",
    styleUrls: ["./relatorio.component.scss"],
})
export class RelatorioComponent implements OnInit {
    filter: RelatorioMensalFilter;
    constructor() {}

    ngOnInit(): void {
        this.filter = new RelatorioMensalFilter();
        this.filter.dataFim = new Date();
        this.filter.dataFim.setMonth(new Date().getMonth() + 6);
        this.filter.dataInicio = new Date();
        this.filter.dataInicio.setMonth(new Date().getMonth() - 6);
    }
}
