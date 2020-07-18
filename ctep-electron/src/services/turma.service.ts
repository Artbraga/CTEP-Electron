import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Turma } from '../model/turma.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from '../model/curso.model';

@Injectable({ providedIn: 'root', })
export class TurmaService extends BaseService<Turma> {

    constructor(http: HttpClient) {
        super(http, 'turma');
    }

    public listar(): Observable<Turma[]> {
        const curso = new Curso();
        curso.nome = 'Técnico de Enfermagem';
        const turmas = [
            { id: 1, codigo: 'TENF2001', diasDaSemana: 'Segundas e Quartas', horaInicio: '13:00', horaFim: '18:00', dataInicio: new Date(), anoInicio: 20, dataFim: null, curso: curso },
            { id: 2, codigo: 'TENF2002', diasDaSemana: 'Terças e Quintas', horaInicio: '18:00', horaFim: '21:00', dataInicio: new Date(), anoInicio: 20, dataFim: null, curso: curso },
            { id: 3, codigo: 'TENF2003', diasDaSemana: 'Sábados', horaInicio: '08:00', horaFim: '12:00', dataInicio: new Date(), anoInicio: 20, dataFim: null, curso: curso }
        ];

        return new BehaviorSubject<Turma[]>(turmas as Turma[]).asObservable();
    }
}
