import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IdProfessorParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { Professor } from '../../../../model/professor.model';
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

    constructor(public dialog: MatDialog,
                private professorService: ProfessorService,
                private routingService: RoutingService,
                private router: Router) {
        super();
    }

    ngOnInit() {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'nome' } as Coluna);
        this.columns.push({ key: 'celular', header: 'Celular', field: 'celular' } as Coluna);
        this.columns.push({ key: 'email', header: 'E-mail', field: 'email' } as Coluna);
        this.columns.push({ key: 'formacao', header: 'Formação', field: 'formacao' } as Coluna);
        this.columns.push({ key: 'ativo', header: 'Situação', field: 'ativo' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        this.buscarProfessores();
    }

    buscarProfessores() {
        this.professorService.listarProfessores().subscribe(data => {
            this.list = data.map(x => Object.assign(new Professor(), x));
        });
    }

    excluirProfessor(element: Professor) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir o professor "${element.nome}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.deletar(element.id).subscribe(() => {
                    this.buscarProfessores();
                });
            }
        });
    }

    editarProfessor(element: Professor) {
        this.routingService.salvarValor(IdProfessorParameter, element.id);
        this.routingService.salvarValor(RotaVoltarParameter, 'tabelaProfessor');
        this.router.navigate([{ outlets: { secondRouter: 'formularioProfessor' } }]);
    }
}
