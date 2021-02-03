import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

export class BaseService {

    private readonly serverURL: string = environment.apiUrl;
    protected readonly baseURL: string = this.serverURL + this.controller;
    protected readonly saveUrl: string = this.baseURL + "/salvar/";
    protected readonly deleteUrl: string = this.baseURL + "/deletar/";

    constructor(protected http: HttpClient, protected readonly controller: string) { }

    public getById(id: any): Observable<any> {
        const getByIdURL = this.baseURL + '/' + id;

        return this.http.get(getByIdURL).pipe(
            map(this.extractData));
    }

    public listar(): Observable<any> {
        const url = this.baseURL + '/';

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public salvar(element: any, successAction: () => void, errorAction: (m) => void): void {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const options = { headers: headers };

        const observable = this.http.post(this.saveUrl, element, options).pipe(
            map(this.extractData));

        const subscription = observable.subscribe(
            (data) => {
                subscription.unsubscribe();
            }
        );
    }

    public deletar(id: any): Observable<any> {
        const url = this.deleteUrl + id;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    public filtrar(nome: string): Observable<any> {
        const url = this.baseURL + '/filtrar/' + nome;

        return this.http.get(url).pipe(
            map(this.extractData));
    }

    protected extractData(res: Response): any {
        const body = res;
        return body;
    }
}
