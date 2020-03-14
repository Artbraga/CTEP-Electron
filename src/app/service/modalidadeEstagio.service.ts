import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({ providedIn: 'root', })
export class ModalidadeEstagioService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'modalidadesEstagio');
    }
}
