import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

export class BaseService{
    
    private readonly serverURL: string = "http://localhost:8080/"
    protected readonly baseURL: string = this.serverURL + this.controller;
    protected readonly saveUrl: string = this.baseURL + "/salvar/";
    protected readonly deleteUrl: string = this.baseURL + "/deletar/";

    constructor(protected http: HttpClient, protected readonly controller: string) { };

    public getById(id: any): Observable<any> {
        let getByIdURL = this.baseURL + '/' + id;

        return this.http.get(getByIdURL).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    };

    public listar(): Observable<any> {
        let url = this.baseURL + '/';
    
        return this.http.get(url).pipe(
          map(this.extractData),
          catchError(this.handleErrorObservable));
    };

    public salvar(element: any, successAction: () => void, errorAction: (m) => void): void {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        let options = { headers: headers };

        let observable = this.http.post(this.saveUrl, element, options).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable),);

        var subscription = observable.subscribe(
            (data) => {
                BaseService.handleReturn(data, successAction, errorAction);
                subscription.unsubscribe();
            }
        );
    };

    public deletar(id: any): Observable<any>{
        let url = this.deleteUrl + id;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    }

    public filtrar(nome: string): Observable<any> {
        let url = this.baseURL + '/filtrar/' + nome;

        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable));
    };

    protected extractData(res: Response): any {
        try {
            let body = res;
            return body;
        } catch (e) {
            return { type: 'badRequest', messages: [{ severity: 'error', summary: 'Falha de comunicação:', detail: "Atualize a página!" }] };
        }
    };

    protected handleErrorObservable(error: Response | any): any {
        console.error(error.message || error);
        return throwError(error.message || error);
    };

    public static handleReturn(data: any, successAction: () => void, errorAction: (m) => void): void {
        try {
            data = JSON.parse(data);
        } catch(e){
            data = JSON.parse(data._body)
            data.Message = data.ExceptionMessage;
        }
        if (data == true) { // Retorna true em caso de sucesso
            successAction();
        } else if (data == false) { // Retorna falso se cair em uma exceção não tratada no backend
            let msg = { type: 'error', messages: [{ severity: 'error', summary: 'Erro', detail: "Algum erro desconhecido ocorreu!" }] };
            errorAction(msg);
        } else if (data.type) {
            errorAction(data);
        } else { // Uma exceção tratada no backend que retorna uma ou mais mensagens de erro
            let msg;
            if (data.Messages) {
                msg = data.Messages.map((er) => { return { severity: 'error', summary: 'Erro', detail: er } });
            } else if (data.Message) {
                msg = [{ severity: 'error', summary: 'Erro', detail: data.Message }]
            }
            errorAction({ type: 'error', messages: msg });
        }
    };


}