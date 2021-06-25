import { Component, OnInit } from '@angular/core';
import { MatDialog } from 'out/secretaria_facil_ctep-win32-x64/resources/app/node_modules/@angular/material/dialog/public-api';
import { PageEvent } from 'out/secretaria_facil_ctep-win32-x64/resources/app/node_modules/@angular/material/paginator/public-api';
import { Router } from 'out/secretaria_facil_ctep-win32-x64/resources/app/node_modules/@angular/router/router';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { Aluno } from 'src/model/aluno.model';
import { IdAlunoParameter, RotaVoltarParameter, PesquisarAlunoRoute, FichaAlunoRoute } from 'src/model/enums/constants';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';

@Component({
  selector: 'app-vencimento-aluno',
  templateUrl: './vencimento-aluno.component.html',
  styleUrls: ['./vencimento-aluno.component.scss']
})
export class VencimentoAlunoComponent extends BaseTable<Aluno> implements OnInit {

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
        this.columns.push({ key: 'cpf', header: 'CPF', field: 'cpf' } as Coluna);
        this.columns.push({ key: 'telefone', header: 'Telefone', field: 'telefone' } as Coluna);
        this.columns.push({ key: 'celular', header: 'Celular', field: 'celular' } as Coluna);
        this.columns.push({ key: 'matricula', header: 'Matrículas', field: 'matriculas' } as Coluna);
        this.columns.push({ key: 'turmas', header: 'Turmas', field: 'turmas' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'tipoStatusAluno' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    visualizarAluno(element: Aluno) {
        this.routingService.salvarValor(IdAlunoParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, PesquisarAlunoRoute);
        this.router.navigate([{ outlets: { secondRouter: FichaAlunoRoute } }]);
    }

    paginacao(event: PageEvent) {

    }
}
