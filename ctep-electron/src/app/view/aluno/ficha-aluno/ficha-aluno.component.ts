import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/model/aluno.model';
import { FichaAlunoParameter, FormularioAlunoParameter, IdAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';
import { Coluna } from 'src/app/custom-components/base-table';
import { RegistroAlunoComponent } from '../registro-aluno/registro-aluno.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { RegistroAluno } from 'src/model/registro-aluno.model';
import { TransferenciaAlunoComponent } from '../transferencia-aluno/transferencia-aluno.component';
import { PrintTabDirective } from 'src/directives/printTabsDirective.directive';

@Component({
    selector: 'ficha-aluno',
    templateUrl: './ficha-aluno.component.html',
    styleUrls: ['./ficha-aluno.component.scss'],
})
export class FichaAlunoComponent implements OnInit {
    rotaVoltar: string;
    element: Aluno;
    imagem: any;
    columnsRegistro: Coluna[] = [];
    idAluno: number;
    @ViewChild('confirmacaoExclusaoTemplate', { static: false }) confirmacaoExclusaoTemplate: TemplateRef<any>;
    @ViewChildren(PrintTabDirective) tab;

    constructor(
        private alunoService: AlunoService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        private router: Router,
        public dialog: MatDialog) {
        this.element = new Aluno();
        this.columnsRegistro.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
        this.columnsRegistro.push({ key: 'registro', header: 'Registro', field: 'registro', addTooltip: true, tooltipMinSize: 150 } as Coluna);
        this.columnsRegistro.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdAlunoParameter)) {
            this.idAluno = this.routingService.excluirValor(IdAlunoParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.carregarAluno();
            this.alunoService.buscarImagem(this.idAluno).subscribe(data => {
                if (data != null && data.size > 0) {
                    const blob = new Blob([data], { type: 'image/png' });
                    const reader = new FileReader();

                    reader.addEventListener('load', (event: any) => {
                        this.imagem = event.target.result;
                    });
                    reader.readAsDataURL(blob);
                }
            });
        }
    }

    carregarAluno() {
        this.alunoService.getById(this.idAluno).subscribe((data) => {
            this.element = Object.assign(new Aluno(), data);
            this.element.corrigirInformacoes();
        });
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    tratarString(str: string): string {
        if (str != null && str.length > 0) {
            return str;
        }
        return '---';
    }

    getCampo(campo: string, aluno: Aluno): string {
        if (aluno != null) {
            switch (campo) {
                case 'sexo':
                    return aluno.sexo === 'm' ? 'Masculino' : 'Feminino';
            }
        }
        return '---';
    }

    vincularTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja vincular o aluno ${this.element.nome} em uma turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TurmaAlunoComponent, { data: this.element }).afterClosed().subscribe(res => {
                    this.carregarAluno();
                });
            }
        });
    }

    imprimir() {
        this.tab.first.print();
    }

    transferirTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja transferir o aluno ${this.element.nome} de turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TransferenciaAlunoComponent, { data: this.element }).afterClosed().subscribe(res => {
                    this.carregarAluno();
                });
            }
        });
    }

    editarAluno() {
        this.routingService.salvarValor(IdAlunoParameter, this.element.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaAlunoParameter );
        this.router.navigate([{ outlets: { secondRouter: FormularioAlunoParameter } }]);
    }

    adicionarRegistro() {
        const dialogRef = this.dialog.open(RegistroAlunoComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.alunoService.adicionarRegistro(result).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro adicionado.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }

    excluirRegistro(registro: RegistroAluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja excluir o registro?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.excluirRegistro(registro.id).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro excluído.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }
}
