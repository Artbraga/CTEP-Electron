import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/model/aluno.model';
import { AlunoService } from 'src/services/aluno.service';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { RoutingService } from '../../../../services/routing.service';
import { FiltroAlunoParameter } from '../../../../model/enums/constants';

@Component({
    selector: 'pesquisar-aluno',
    templateUrl: './pesquisar-aluno.component.html',
    styleUrls: ['./pesquisar-aluno.component.scss'],
})
export class PesquisarAlunoComponent implements OnInit {
    filtro: FiltroAluno;
    list: Aluno[];
    constructor(private alunoService: AlunoService,
                private routingService: RoutingService) {}

    ngOnInit(): void {
        if (this.routingService.possuiValor(FiltroAlunoParameter)) {
            this.filtro = this.routingService.buscarValor(FiltroAlunoParameter);
            this.pesquisar();
        } else {
            this.filtro = new FiltroAluno();
        }
    }

    pesquisar(filtro: FiltroAluno = null) {
        if (filtro != null) {
            this.filtro = filtro;
            this.routingService.salvarValor(FiltroAlunoParameter, this.filtro);
        }
        this.alunoService.pesquisarAlunos(this.filtro).subscribe(data => {
            this.list = data.map(x => Object.assign(new Aluno(), x));
        });
    }
}
