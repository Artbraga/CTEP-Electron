import { BaseService } from '../../services/base.service';
import { OnInit } from '@angular/core';

export abstract class BaseFormularioComponent<T> {
    constructor(public service: BaseService<T>,
                public element: T) { }

    abstract validar(): boolean;

    salvar(): void {
    }

    stringValida(txt: string) {
        return txt != null && txt.length > 0;
    }
}
