import { Input, ChangeDetectorRef, ViewChild } from "@angular/core";
import { BaseService } from "./base-service";
import { TableXComponent, Coluna } from "../components/table-x/table-x.component";

export class BaseTable {
    loadingTable: boolean = false;
    list: any[] = [];
    colunas: Coluna[];
    @ViewChild('tableComponent') tableComponent: TableXComponent;

    constructor(private service: BaseService, protected ref: ChangeDetectorRef){ 
        this.loadingTable = true;
        service.listar().subscribe(data => {
            this.list = data;
            this.loadingTable = false;
        });
    }

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}