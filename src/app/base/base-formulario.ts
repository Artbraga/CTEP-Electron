import { Input, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { Message } from "primeng/primeng";
import { BaseService } from "./base-service";

export class BaseFormulario<T>{
    @Input() element: T;
    @Input() loading: number;
    @Output() fechar = new  EventEmitter<any>()
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

    constructor(public baseService: BaseService, 
                protected ref: ChangeDetectorRef){
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

    salvar(element: any, action: () => void, actionErro?: (error) => void) {
        let errorAction: (any) => void = actionErro ? actionErro : (error) => {
            this.loading = (this.loading <= 0) ? 0 : this.loading - 1;
            this.updateView();
            this.showFeedbackMessage(error);
        };
        this.updateView();
        this.baseService.salvar(
            element,
            action,
            errorAction
        );
    };

    public showFeedbackMessage(m: Message) {
        if (m == null) {
            return;
        }
        this.msgs.push(m);
    }
}