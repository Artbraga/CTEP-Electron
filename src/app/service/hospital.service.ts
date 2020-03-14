import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({ providedIn: 'root', })
export class HospitalService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'hospitais');
    }
}
