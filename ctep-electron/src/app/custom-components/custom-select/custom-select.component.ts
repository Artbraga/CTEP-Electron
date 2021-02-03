import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
    isOpen: boolean = false;
    @Input() options: any[];
    @Input() field: string;
    @Input() selected: any;
    @Input() multiple: boolean = false;
    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() style: any;
    @Input() placeholder: string = 'Selecione';

    @ViewChild('selectControl', {static: true}) selectControl;
    @Output() selectedChange = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() open: EventEmitter<any> = new EventEmitter<any>();

    @Input() compareWith: (o1, o2) => boolean = (o1, o2) => o1 === o2;

    openChanged(event) {
        this.isOpen = event;
        if (event) {
            this.open.emit();
        }
    }

    onChange(value) {
        this.selectedChange.emit(this.selected);
        if (this.select != null) {
            this.select.emit(value);
        }
    }

    getLoading(): boolean {
        return this.options !== null && (this.isOpen || (!this.selectControl.panelOpen && this.selected !== null));
    }

    public resolveField(obj: any, field: string) {
        if (field == null || field.trim() === '') { return null; }
        let fields = field.split('.');
        if (fields.length > 1) {
            const campo = fields[0];
            fields = fields.slice(1);
            if (obj[campo] != null) {
                return this.resolveField(obj[campo], fields.join('.'));
            }
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        if (typeof obj[field] === 'number') {
            return obj[field].toLocaleString();
        }
        return obj[field];
    }

}

export interface SelectItem<T> {
    name: string;
    value: T;
}
