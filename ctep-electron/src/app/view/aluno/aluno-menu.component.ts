import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-aluno-menu",
    templateUrl: "./aluno-menu.component.html",
    styleUrls: ["./aluno-menu.component.scss"],
})
export class AlunoMenuComponent implements OnInit {
    expanded: boolean = true;
    constructor() {}

    ngOnInit(): void {}
}
