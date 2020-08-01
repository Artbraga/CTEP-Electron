import { Component, OnInit } from '@angular/core';
import { BaseTable, Coluna } from '../../../custom-components/base-table';
import { Turma } from '../../../../model/turma.model';
import { TurmaService } from '../../../../services/turma.service';

@Component({
    selector: 'tabela-turma',
    templateUrl: './tabela-turma.component.html',
    styleUrls: ['./tabela-turma.component.scss']
})
export class TabelaTurmaComponent extends BaseTable<Turma> implements OnInit {

    constructor(private turmaService: TurmaService) {
        super();
    }

    ngOnInit() {
        this.columns.push({ key: 'codigo', header: 'Código', field: 'codigo' } as Coluna);
        this.columns.push({ key: 'curso', header: 'Curso', field: 'curso.nome' } as Coluna);
        this.columns.push({ key: 'dia', header: 'Dias da Semana', field: 'diasDaSemana' } as Coluna);
        this.turmaService.listarTurmasAtivas().subscribe(data => {
            this.list = data.map(x => Object.assign(new Turma(), x));
        });
    }

}
