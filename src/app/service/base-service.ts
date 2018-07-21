import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

export class BaseService{
    
    private readonly serverURL: string = "localhost:8080/"
    protected readonly baseURL: string = this.serverURL + this.controller;

    constructor(protected http: HttpClient, protected readonly controller: string) { };

    public getById(id: number): Observable<any> {
        let getByIdURL = this.baseURL + '/' + id;

        return this.http.get(getByIdURL).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable),);
    };

    public Listar(): Observable<any> {
        let url = this.baseURL + '/';
    
        return this.http.get(url).pipe(
          map(this.extractData),
          catchError(this.handleErrorObservable),);
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


}