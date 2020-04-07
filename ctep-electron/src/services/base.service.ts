import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export class BaseService<T> {

    private readonly serverURL: string = environment.apiUrl;
    protected readonly baseURL: string = this.serverURL + this.controller;
    protected readonly saveUrl: string = this.baseURL + '/Salvar/';
    protected readonly deleteUrl: string = this.baseURL + '/Seletar/';

    constructor(protected http: HttpClient, protected readonly controller: string) { }

    public getById(id: number): Observable<T> {
        const getByIdURL = this.baseURL + '/' + id;

        return this.http.get<T>(getByIdURL);
    }

    public listar(): Observable<T[]> {
        const url = this.baseURL + '/';

        return this.http.get<T[]>(url);
    }

    public salvar(element: T): Observable<any> {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const options = { headers };

        return this.http.post(this.saveUrl, element, options);
    }

    public deletar(id: number): Observable<any> {
        const url = this.deleteUrl + id;
        return this.http.delete(url);
    }
}
