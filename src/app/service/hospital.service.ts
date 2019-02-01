import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Aluno } from '../entities/aluno';

@Injectable({ providedIn: 'root', })
export class HospitalService extends BaseService{

    constructor(http: HttpClient) {
        super(http, 'hospitais');
    };

}