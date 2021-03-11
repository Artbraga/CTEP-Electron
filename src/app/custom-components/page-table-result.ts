export class PageTableResult<T> {
    total: number;
    pagina: number;
    tamanhoPagina: number;
    lista: T[] = [];
}
