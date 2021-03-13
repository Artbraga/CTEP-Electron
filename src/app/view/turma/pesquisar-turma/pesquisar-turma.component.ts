import { Component, OnInit } from '@angular/core';
import { FiltroTurmaParameter } from 'src/model/enums/constants';
import { FiltroTurma } from 'src/model/filters/turma.filter';
import { Turma } from 'src/model/turma.model';
import { RoutingService } from 'src/services/routing.service';
import { TurmaService } from 'src/services/turma.service';

@Component({
  selector: 'app-pesquisar-turma',
  templateUrl: './pesquisar-turma.component.html',
  styleUrls: ['./pesquisar-turma.component.scss']
})
export class PesquisarTurmaComponent implements OnInit {

    filtro: FiltroTurma;
    list: Turma[];
    constructor(private turmaService: TurmaService, private routingService: RoutingService) {}

    ngOnInit(): void {
        if (this.routingService.possuiValor(FiltroTurmaParameter)) {
            this.filtro = this.routingService.buscarValor(FiltroTurmaParameter);
            this.pesquisar();
        } else {
            this.filtro = new FiltroTurma();
        }
    }

    pesquisar(filtro: FiltroTurma = null) {
        if (filtro != null) {
            this.filtro = filtro;
            this.routingService.salvarValor(FiltroTurmaParameter, this.filtro);
        }
        this.turmaService.pesquisarTurmas(this.filtro).subscribe(data => {
            this.list = data.map(x => {
                const turma = Object.assign(new Turma(), x);
                turma.ajustarDatas();
                return turma;
            });
        });
    }
}
