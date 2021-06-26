import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { Aluno } from 'src/model/aluno.model';
import { IdAlunoParameter, RotaVoltarParameter, PesquisarAlunoRoute, FichaAlunoRoute, FiltroAlunoParameter, HomeRoute } from 'src/model/enums/constants';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';

@Component({
  selector: 'vencimento-aluno',
  templateUrl: './vencimento-aluno.component.html',
  styleUrls: ['./vencimento-aluno.component.scss']
})
export class VencimentoAlunoComponent extends BaseTable<Aluno> implements OnInit {

    filtro: FiltroAluno;
    constructor(public dialog: MatDialog,
                public alunoService: AlunoService,
                public notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router) {
        super();
        this.pageList = new PageTableResult<Aluno>();
    }

    ngOnInit() {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'nome' } as Coluna);
        this.columns.push({ key: 'turmas', header: 'Turmas', field: 'turmas' } as Coluna);
        this.columns.push({ key: 'vencimento', header: 'Vencimento', field: 'dataValidadeStr' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        if (this.routingService.possuiValor(FiltroAlunoParameter)) {
            this.filtro = this.routingService.excluirValor(FiltroAlunoParameter);
        } else {
            this.filtro = new FiltroAluno();
        }
        this.pageList = new PageTableResult<Aluno>();
        this.pesquisar();
    }

    pesquisar() {
        this.alunoService.listarAlunosPorVencimento(this.filtro).subscribe(data => {
            this.pageList = data;
            this.pageList.lista = data.lista.map(x => {
                const aluno = Object.assign(new Aluno(), x);
                aluno.corrigirInformacoes();
                return aluno;
            });
        });
    }

    visualizarAluno(element: Aluno) {
        this.routingService.salvarValor(IdAlunoParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, HomeRoute);
        this.router.navigate(['aluno'])
            .then(() => this.router.navigate([{ outlets: { secondRouter: FichaAlunoRoute }}]));
    }

    paginacao(event: PageEvent) {
        this.filtro.pagina = event.pageIndex;
        this.pesquisar();
    }
}
