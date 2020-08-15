import { Component, OnInit } from "@angular/core";
import { Aluno } from 'src/model/aluno.model';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { MatDialog } from '@angular/material/dialog';
import { TurmaService } from 'src/services/turma.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';

@Component({
    selector: "tabela-aluno",
    templateUrl: "./tabela-aluno.component.html",
    styleUrls: ["./tabela-aluno.component.scss"],
})
export class TabelaAlunoComponent extends BaseTable<Aluno> implements OnInit {

    constructor(public dialog: MatDialog,
                private routingService: RoutingService,
                private router: Router) {
        super();
    }

    ngOnInit() {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'nome' } as Coluna);
        this.columns.push({ key: 'telefone', header: 'Telefone', field: 'telefone' } as Coluna);
        this.columns.push({ key: 'celular', header: 'Celular', field: 'celular' } as Coluna);
        this.columns.push({ key: 'turmas', header: 'Turmas', field: 'turmas' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'tipoStatusAluno' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    visualizarAluno(element: Aluno) {

    }

    editarAluno(element: Aluno) {

    }

    excluirAluno(element: Aluno) {

    }
}
