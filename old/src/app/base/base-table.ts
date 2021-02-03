import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseTable<T> {
    @Input() list: T[] = [];
    @Output() listChange = new EventEmitter();

    columns: Coluna[];
    loadingTabela: number;

    dynamicColumns: { key: string; col: Coluna }[];

    constructor() { }

    ordenarTabela(ordem) {
		if (ordem.dir == 'asc') {
			this.list.sort((a, b) =>
				this.resolveField(a, ordem.sortField) <
				this.resolveField(b, ordem.sortField)
					? -1
					: 1
			);
		} else if (ordem.dir == 'desc') {
			this.list.sort((a, b) =>
				this.resolveField(a, ordem.sortField) <
				this.resolveField(b, ordem.sortField)
					? 1
					: -1
			);
		}
	}

	public resolveField(obj: any, field: string) {
		if (field == null || field.trim() == '') return null;
		let fields = field.split('.');
		if (fields.length > 1) {
			let campo = fields[0];
			fields = fields.slice(1);
			if (obj[campo] != null) {
				return this.resolveField(obj[campo], fields.join('.'));
			}
		}
		return obj[field];
	}
}

export class Coluna {
    key: string;
    header?: string;
    field?: string = '';
    empty?: boolean;
    headerTemplateName?: string;
    bodyTemplateName?: string;
    colspan?: number = 1;
    classHeader?: string;
    classBody?: string;
    groupKey?: string[] | string;
    mesclavel?: boolean = false;
    sortable?: boolean = true;
    sortField?: string = null;
    isNumeric?: boolean = false;
}

export class ColumnGroup {
    keyGroup: string;
    groupHasBody: boolean = true;
    groupHasHeader: boolean = true;
    groupHeaderClass?: string;
    groupBodyClass?: string;
}

export class Table<T> {
    list: T[];
    pageSize: number;
    totalCount: number;
}
