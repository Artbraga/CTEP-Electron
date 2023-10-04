import { Component, OnInit } from "@angular/core";

@Component({
    selector: "faturamento",
    templateUrl: "./faturamento.component.html",
    styleUrls: ["./faturamento.component.scss"],
})
export class FaturamentoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    private datasets = [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
        },
    ];

    private labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

    private options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
}
