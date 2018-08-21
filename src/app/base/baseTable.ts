import { Input, ChangeDetectorRef, ViewChild } from "@angular/core";
import { BaseService } from "./base-service";
import { TableXComponent, Coluna } from "../components/table-x/table-x.component";

export class BaseTable {
    loadingTable: boolean = false;
    @Input() list: any[] = [];
    colunas: Coluna[];
    @ViewChild('tableComponent') tableComponent: TableXComponent;

    constructor(private service: BaseService, protected ref: ChangeDetectorRef){ 
    }

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}