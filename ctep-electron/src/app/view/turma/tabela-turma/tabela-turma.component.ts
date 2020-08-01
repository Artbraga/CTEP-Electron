import { Component, OnInit } from '@angular/core';
import { BaseTable, Coluna } from '../../../custom-components/base-table';
import { Turma } from '../../../../model/turma.model';
import { TurmaService } from '../../../../services/turma.service';
import { RoutingService } from '../../../../services/routing.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { LoadingService } from '../../../custom-components/loading/loading.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tabela-turma',
    templateUrl: './tabela-turma.component.html',
    styleUrls: ['./tabela-turma.component.scss']
})
export class TabelaTurmaComponent extends BaseTable<Turma> implements OnInit {

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
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
        this.buscarTurmas();
    }

    buscarTurmas() {
        this.turmaService.listarTurmasAtivas().subscribe(data => {
            this.list = data.map(x => Object.assign(new Turma(), x));
        });
    }

    excluirTurma(element: Turma) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir a turma "${element.codigo}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.turmaService.deletar(element.id).subscribe(() => {
                    this.buscarTurmas();
                });
            }
        });
    }

    editarTurma(element: Turma) {
        this.routingService.salvarValor('idTurma', element.id.toString());
        this.router.navigate([{ outlets: { secondRouter: 'formularioTurma' } }]);
    }

    visualizarTurma(element: Turma) {

    }
}
