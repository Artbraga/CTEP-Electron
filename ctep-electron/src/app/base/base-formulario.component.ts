import { BaseService } from '../../services/base.service';

export abstract class BaseFormularioComponent<T> {
    constructor(public service: BaseService<T>,
                public element: T) { }

    abstract validar(): boolean;

    salvar(): void {
        
    }
}
