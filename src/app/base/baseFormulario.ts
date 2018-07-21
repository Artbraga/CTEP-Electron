import { Input, ChangeDetectorRef } from "@angular/core";
import { Message } from "primeng/primeng";

export class BaseFormulario<T>{
    @Input() element: T;
    @Input() loading: number;
    msgs: Message[] = [];

    constructor(protected ref: ChangeDetectorRef){
    }

    public updateView() {
        if (this.ref) {
            this.ref.detectChanges();
        }
    }
}