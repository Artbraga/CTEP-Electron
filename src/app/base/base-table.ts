import { Input, ChangeDetectorRef, ViewChild } from "@angular/core";
import { BaseService } from "./base-service";
import { TableXComponent, Coluna } from "../components/table-x/table-x.component";

export class BaseTable<T> {
    loadingTable: boolean = false;
    @Input() list: T[] = [];
    colunas: Coluna[];
    @ViewChild('tableComponent') tableComponent: TableXComponent;

    displayDelete: boolean = false;

    constructor(protected ref: ChangeDetectorRef){ 
    }

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}