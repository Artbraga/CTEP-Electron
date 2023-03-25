import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';
import { FiltroBoleto } from 'src/model/filters/boleto.filter';
import { Boleto } from 'src/model/boleto.model';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';
import { TratamentoRequest } from 'src/model/tratamento-request.model';
import { RegistroRetorno } from 'src/model/registro-retorno.model';

@Injectable({ providedIn: 'root', })
export class FinanceiroService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Financeiro');
    }

    filtrarBoletos(filtro: FiltroBoleto): Observable<PageTableResult<Boleto>> {
        const url = this.baseURL + `/FiltrarBoletos`;

        return this.http.post<PageTableResult<Boleto>>(url, filtro);
    }

    salvarBoletos(boletos: Boleto[]): Observable<boolean> {
        const url = this.baseURL + `/SalvarBoletos`;

        return this.http.post<boolean>(url, boletos);
    }

    alterarStatusBoleto(boleto: Boleto): Observable<boolean> {
        const url = this.baseURL + `/AlterarStatusBoleto`;

        return this.http.post<boolean>(url, boleto);
    }

    verificarExistenciaBoletos(numero: string, parcelas: number): Observable<boolean> {
        const url = this.baseURL + `/VerificarExistenciaBoletos`;

        return this.http.post<boolean>(url, {numero, parcelas});
    }

    lerArquivos(arquivos: File[]): Observable<TratamentoRequest<RetornoArquivo>[]> {
        const url = this.baseURL + `/LerArquivos`;
        let formData = new FormData();
        arquivos.forEach(a => {
            formData.append(a.name, a);
        })
        return this.http.post<TratamentoRequest<RetornoArquivo>[]>(url, formData);
    }

    processarMovimentacoes(retornos: RetornoArquivo[]): Observable<RegistroRetorno[]> {
        const url = this.baseURL + `/ProcessarMovimentacoes`;

        return this.http.post<RegistroRetorno[]>(url, retornos);
    }

}
