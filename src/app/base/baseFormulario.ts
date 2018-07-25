import { Input, ChangeDetectorRef } from "@angular/core";
import { Message } from "primeng/primeng";

export class BaseFormulario<T>{
    @Input() element: T;
    @Input() loading: number;
    msgs: Message[] = [];

    br = {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar'
    };

    constructor(protected ref: ChangeDetectorRef){
    }

    protected validField(field): boolean {
        if (field == null || field == undefined || (typeof (field) == typeof ('') && field.trim() == "")) {
            return false;
        }
        return true;
    };

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}