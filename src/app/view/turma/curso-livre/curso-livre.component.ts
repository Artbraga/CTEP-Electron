import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseTable, Coluna } from 'src/app/custom-components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { CursoLivre } from 'src/model/curso-livre.model';
import { RotaVoltarParameter, FiltroTurmaCursoLivreParameter, CursoLivreRoute, FormularioTurmaCursoLivreRoute, IdTurmaCursoLivreParameter } from 'src/model/enums/constants';
import { FiltroCursoLivre } from 'src/model/filters/curso-livre.filter';
import { TurmaCursoLivre } from 'src/model/turma-curso-livre.model';
import { CursoLivreService } from 'src/services/curso-livre.service';
import { RoutingService } from 'src/services/routing.service';

@Component({
    selector: 'app-curso-livre',
    templateUrl: './curso-livre.component.html',
    styleUrls: ['./curso-livre.component.scss']
})
export class CursoLivreComponent extends BaseTable<TurmaCursoLivre> implements OnInit {
    cursosOptions: CursoLivre[];
    cursoSelecionado: CursoLivre;

    filtro: FiltroCursoLivre;

    constructor(public dialog: MatDialog,
                private cursoLivreService: CursoLivreService,
                private routingService: RoutingService,
                private notificationService: NotificationService,
                private router: Router) {
        super();
        this.columns.push({ key: 'curso', header: 'Curso', field: 'curso.nome' } as Coluna);
        this.columns.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
        this.columns.push({ key: 'horario', header: 'Horário', field: 'horario' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    ngOnInit(): void {
        this.cursoLivreService.listarCursoLivre().subscribe(data => {
            this.cursosOptions = data.map((x) => Object.assign(new CursoLivre(), x));
            if (this.filtro.cursoLivreId != null) {
                this.cursoSelecionado = this.cursosOptions.find(x => x.id == this.filtro.cursoLivreId);
            }
        });
        this.limpar();
        if (this.routingService.possuiValor(FiltroTurmaCursoLivreParameter)) {
            this.filtro = this.routingService.buscarValor(FiltroTurmaCursoLivreParameter);
            this.pesquisarTurmas();
        } else {
            this.filtro = new FiltroCursoLivre();
        }
    }

    limpar() {
        this.filtro = new FiltroCursoLivre();
        this.cursoSelecionado = null;
    }

    pesquisarTurmas() {
        if (this.cursoSelecionado != null) {
            this.filtro.cursoLivreId = this.cursoSelecionado.id;
        }
        this.cursoLivreService.pesquisarTurmasCursoLivre(this.filtro).subscribe(data => {
            this.list = data.map(x =>  {
                const t = Object.assign(new TurmaCursoLivre(), x)
                t.ajustarDatas();
                return t;
            });
        });
    }

    adicionarTurma() {
        this.routingService.salvarValor(FiltroTurmaCursoLivreParameter, this.filtro);
        this.routingService.salvarValor(RotaVoltarParameter, CursoLivreRoute);
        this.router.navigate([{ outlets: { secondRouter: FormularioTurmaCursoLivreRoute } }]);
    }

    excluirTurma(element: TurmaCursoLivre) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja realmente excluir a turma de ${element.curso.nome} do dia ${element.dataStr}?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cursoLivreService.deletarTurmaCursoLivre(element.id).subscribe(() => {
                    this.notificationService.addNotification('Sucesso!', 'A turma foi excluída com sucesso.', NotificationType.Success);
                    this.pesquisarTurmas();
                });
            }
        });
    }

    editarTurma(element: TurmaCursoLivre) {
        this.routingService.salvarValor(IdTurmaCursoLivreParameter, element.id);
        this.routingService.salvarValor(FiltroTurmaCursoLivreParameter, this.filtro);
        this.routingService.salvarValor(RotaVoltarParameter, CursoLivreRoute);
        this.router.navigate([{ outlets: { secondRouter: FormularioTurmaCursoLivreRoute } }]);
    }

}
