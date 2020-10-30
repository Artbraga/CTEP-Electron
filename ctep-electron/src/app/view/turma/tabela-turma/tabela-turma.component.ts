import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseTable, Coluna } from '../../../custom-components/base-table';
import { Turma } from '../../../../model/turma.model';
import { TurmaService } from '../../../../services/turma.service';
import { RoutingService } from '../../../../services/routing.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { Router } from '@angular/router';

@Component({
    selector: 'tabela-turma',
    templateUrl: './tabela-turma.component.html',
    styleUrls: ['./tabela-turma.component.scss']
})
export class TabelaTurmaComponent extends BaseTable<Turma> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();

    constructor(public dialog: MatDialog,
                private turmaService: TurmaService,
                private routingService: RoutingService,
                private router: Router) {
        super();
    }

    ngOnInit() {
        this.columns.push({ key: 'codigo', header: 'Código', field: 'codigo' } as Coluna);
        this.columns.push({ key: 'curso', header: 'Curso', field: 'curso.nome' } as Coluna);
        this.columns.push({ key: 'dia', header: 'Dias da Semana', field: 'diasDaSemana' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'status' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    excluirTurma(element: Turma) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir a turma "${element.codigo}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.turmaService.deletar(element.id).subscribe(() => {
                    this.pesquisar.emit();
                });
            }
        });
    }

    editarTurma(element: Turma) {
        this.routingService.salvarValor('idTurma', element.id);
        this.routingService.salvarValor('rotaVoltar', 'tabelaTurma');
        this.router.navigate([{ outlets: { secondRouter: 'formularioTurma' } }]);
    }

    visualizarTurma(element: Turma) {

    }
}
