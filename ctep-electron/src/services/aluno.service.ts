import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../model/aluno.model';

@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }
}
