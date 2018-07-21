import { Input, ChangeDetectorRef } from "@angular/core";
import { BaseService } from "./base-service";

export class BaseTable {
    @Input() loading: number = 0;
    list: any[];
    colunas: any[];
    constructor(private service: BaseService, protected ref: ChangeDetectorRef){ 
        this.loading = 1;
        service.Listar().subscribe(data => {
            this.list = data;
            this.loading = 0;
        });
    }

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}