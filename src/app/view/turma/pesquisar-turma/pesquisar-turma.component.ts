import { Component, OnInit } from '@angular/core';
import { FiltroTurma } from 'src/model/filters/turma.filter';
import { Turma } from 'src/model/turma.model';
import { TurmaService } from 'src/services/turma.service';

@Component({
  selector: 'app-pesquisar-turma',
  templateUrl: './pesquisar-turma.component.html',
  styleUrls: ['./pesquisar-turma.component.scss']
})
export class PesquisarTurmaComponent implements OnInit {

    filtro: FiltroTurma;
    list: Turma[];
    constructor(private turmaService: TurmaService) {}

    ngOnInit(): void {}

    pesquisar(filtro: FiltroTurma = null) {
        if (filtro != null) {
            this.filtro = filtro;
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
