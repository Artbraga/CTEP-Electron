
export abstract class BaseFormularioComponent<T> {
    isEdicao = false;
    rotaVoltar: string = null;
    id: number;
    constructor(public element: T) { }

    abstract validar(): boolean;

    salvar(): void {
    }

    stringValida(txt: string) {
        return txt != null && txt.length > 0;
    }
}
