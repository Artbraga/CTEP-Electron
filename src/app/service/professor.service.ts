import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({ providedIn: 'root', })
export class ProfessorService extends BaseService {

    constructor(http: HttpClient) {
        super(http, 'professores');
    }
}
