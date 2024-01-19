import { Input, Output, EventEmitter } from "@angular/core";
import { PageTableResult } from "./page-table-result";
import * as $ from "jquery";

export abstract class BaseTable<T> {
    @Input() list: T[] = [];
    @Input() pageList = new PageTableResult<T>();
    @Output() listChange = new EventEmitter();
    fatorConversao = 140;

    get heigthTabela(): string {
        const t = $(".tabela");
        if (t.offset() == null) return "50vh";
        return window.innerHeight - t.offset().top - this.fatorConversao + "px";
    }

    columns: Coluna[] = [];

    dynamicColumns: { key: string; col: Coluna }[];

    ordenarTabela(ordem) {
        if (ordem.dir == "asc") {
            this.list.sort((a, b) =>
                this.resolveField(a, ordem.sortField) <
                this.resolveField(b, ordem.sortField)
                    ? -1
                    : 1
            );
        } else if (ordem.dir == "desc") {
            this.list.sort((a, b) =>
                this.resolveField(a, ordem.sortField) <
                this.resolveField(b, ordem.sortField)
                    ? 1
                    : -1
            );
        }
    }

    private resolveField(obj: any, field: string) {
        if (field == null || field.trim() == "") {
            return null;
        }
        let fields = field.split(".");
        if (fields.length > 1) {
            const campo = fields[0];
            fields = fields.slice(1);
            if (obj[campo] != null) {
                return this.resolveField(obj[campo], fields.join("."));
            }
        }
        return obj[field];
    }
}

export class Coluna {
    key: string;
    header?: string;
    field = "";
    empty?: boolean;
    headerTemplateName?: string;
    bodyTemplateName?: string;
    colspan = 1;
    classHeader?: string;
    classBody?: string;
    groupKey?: string[] | string;
    mesclavel = false;
    sortable = true;
    sortField?: string = null;
    isNumeric = false;
    addTooltip = false;
    tooltipMinSize?: number;
}

export class ColumnGroup {
    keyGroup: string;
    groupHasBody = true;
    groupHasHeader = true;
    groupHeaderClass?: string;
    groupBodyClass?: string;
}
