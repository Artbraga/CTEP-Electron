import { Component, Input, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'custom-datetimepicker',
    templateUrl: './custom-datetimepicker.component.html',
    styleUrls: ['./custom-datetimepicker.component.scss'],
})
export class CustomDatetimepickerComponent {

    private _value: Date;

    classeInvalido;

    @Input() name: string;
    @Input() classe: string;
    @Input() disabled = false;
    @Input() obrigatorio: boolean;

    @Output() validaCampo = new EventEmitter();
    @ViewChild('campo', { static: true }) selectControl;

    get value() {
        return this._value;
    }

    @Input()
    set value(x) {
        this.valueChange.emit(x);
        this._value = x;
    }

    @Output() valueChange = new EventEmitter();
    events: string[] = [];

    campoInvalido() {
        if (this.obrigatorio) {
            if (!this.selectControl.nativeElement.value) {
                this.classeInvalido = { 'mat-form-field-invalid': true, 'mat-form-field-outline-end': true };
                return false;
            } else {
                this.classeInvalido = { 'mat-form-field-invalid': false, 'mat-form-field-outline-end': false };
                return true;
            }
        }
    }

    validarPreenchimentoCampo(event) {
        const data = event.currentTarget.value;
        const partes = data.split('/');
        let cont = 0;

        partes.forEach(x => {
            if (x == '') {
                cont++;
            }
        });

        if (cont != 0 || !data) {
            event.currentTarget.value = null;
        }
        this.campoInvalido();
    }
}
