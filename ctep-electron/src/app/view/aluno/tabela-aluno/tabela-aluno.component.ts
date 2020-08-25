import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Aluno } from 'src/model/aluno.model';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { MatDialog } from '@angular/material/dialog';
import { TurmaService } from 'src/services/turma.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { AlunoService } from 'src/services/aluno.service';

@Component({
    selector: "tabela-aluno",
    templateUrl: "./tabela-aluno.component.html",
    styleUrls: ["./tabela-aluno.component.scss"],
})
export class TabelaAlunoComponent extends BaseTable<Aluno> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();

    constructor(public dialog: MatDialog,
                public alunoService: AlunoService,
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
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir o aluno "${element.nome}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.deletar(element.id).subscribe(() => {
                    this.pesquisar.emit();
                });
            }
        });

    }
}
