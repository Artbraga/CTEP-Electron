import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IdProfessorParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { Professor } from '../../../../model/professor.model';
import { Turma } from '../../../../model/turma.model';
import { ProfessorService } from '../../../../services/professor.service';
import { RoutingService } from '../../../../services/routing.service';
import { BaseTable, Coluna } from '../../../custom-components/base-table';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';

@Component({
    selector: 'app-tabela-professor',
    templateUrl: './tabela-professor.component.html',
    styleUrls: ['./tabela-professor.component.scss']
})
export class TabelaProfessorComponent extends BaseTable<Professor> implements OnInit {

    @Output() pesquisar = new EventEmitter<any>();

    constructor(public dialog: MatDialog,
                private professorService: ProfessorService,
                private routingService: RoutingService,
                private router: Router) {
        super();
    }

    ngOnInit() {
        this.columns.push({ key: 'codigo', header: 'Código', field: 'codigo' } as Coluna);
        this.columns.push({ key: 'curso', header: 'Curso', field: 'curso.nome' } as Coluna);
        this.columns.push({ key: 'dia', header: 'Dias da Semana', field: 'diasDaSemana' } as Coluna);
        this.columns.push({ key: 'horario', header: 'Horário', field: 'horario' } as Coluna);
        this.columns.push({ key: 'inicio', header: 'Início', field: 'dataInicioStr' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'status' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    excluirProfessor(element: Professor) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir o professor "${element.nome}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.deletar(element.id).subscribe(() => {
                    this.pesquisar.emit();
                });
            }
        });
    }

    editarTurma(element: Turma) {
        this.routingService.salvarValor(IdProfessorParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, 'tabelaProfessor');
        this.router.navigate([{ outlets: { secondRouter: 'formularioProfessor' } }]);
    }
}
