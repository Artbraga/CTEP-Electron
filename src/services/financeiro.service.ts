import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';
import { FiltroBoleto } from 'src/model/filters/boleto.filter';
import { Boleto } from 'src/model/boleto.model';
import { PageTableResult } from 'src/app/custom-components/page-table-result';

@Injectable({ providedIn: 'root', })
export class FinanceiroService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Financeiro');
    }

    filtrarBoletos(filtro: FiltroBoleto): Observable<PageTableResult<Boleto>> {
        const url = this.baseURL + `/FiltrarBoletos`;

        return this.http.post<PageTableResult<Boleto>>(url, filtro);
    }
}
