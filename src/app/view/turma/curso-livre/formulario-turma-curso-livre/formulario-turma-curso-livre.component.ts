import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from 'src/app/base/base-formulario.component';
import { Coluna } from 'src/app/custom-components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { CursoLivre } from 'src/model/curso-livre.model';
import { RotaVoltarParameter, IdTurmaCursoLivreParameter } from 'src/model/enums/constants';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { ParticipacaoCursoLivre } from 'src/model/participacao-curso-livre.model';
import { TurmaCursoLivre } from 'src/model/turma-curso-livre.model';
import { CursoLivreService } from 'src/services/curso-livre.service';
import { RoutingService } from 'src/services/routing.service';
import { FormularioAlunoCursoLivreComponent } from '../formulario-aluno-curso-livre/formulario-aluno-curso-livre.component';

@Component({
    selector: 'app-formulario-turma-curso-livre',
    templateUrl: './formulario-turma-curso-livre.component.html',
    styleUrls: ['./formulario-turma-curso-livre.component.scss']
})
export class FormularioTurmaCursoLivreComponent extends BaseFormularioComponent<TurmaCursoLivre> implements OnInit {
    masks = MaskPatterns;

    cursoSelecionado: CursoLivre;
    cursosOptions: CursoLivre[];

    columnsAlunos: Coluna[] = [];

    constructor(private cursoLivreService: CursoLivreService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new TurmaCursoLivre());
    }

    ngOnInit(): void {
        this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
        this.columnsAlunos.push({ key: 'nome', header: 'Nome', field: 'aluno.nome' } as Coluna);
        this.columnsAlunos.push({ key: 'cpf', header: 'CPF', field: 'aluno.cpf' } as Coluna);
        this.columnsAlunos.push({ key: 'rg', header: 'RG', field: 'aluno.rg' } as Coluna);
        this.columnsAlunos.push({ key: 'orgao', header: 'Órgão Emissor', field: 'aluno.orgaoEmissor' } as Coluna);
        this.columnsAlunos.push({ key: 'celular', header: 'Celular', field: 'aluno.celular' } as Coluna);
        this.columnsAlunos.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        if (this.routingService.possuiValor(IdTurmaCursoLivreParameter)) {
            this.id = this.routingService.excluirValor(IdTurmaCursoLivreParameter) as number;
            this.carregarTurma();
        } else {
            this.listarCursos();
        }
    }

    carregarTurma() {
        this.cursoLivreService.buscarTurmaCursoLivrePorId(this.id).subscribe(data => {
            this.element = Object.assign(new TurmaCursoLivre(), data);
            this.element.ajustarDatas();
            this.isEdicao = true;
            this.listarCursos();
        });
    }

    listarCursos() {
        this.cursoLivreService.listarCursoLivre().subscribe(data => {
            this.cursosOptions = data.map(x => Object.assign(new CursoLivre(), x));
            if (this.element.curso != null) {
                this.cursoSelecionado = this.cursosOptions.find(x => x.id === this.element.curso.id);
            }
        });
    }

    validar(): boolean {
        let valida = true;
        if (this.cursoSelecionado == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário selecionar o curso ao aqual a turma será associada.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.horaInicio) || !this.stringValida(this.element.horaFim)) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o horário de início e fim da turma.', NotificationType.Error);
        }
        if (this.element.data == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher a data de início da turma.', NotificationType.Error);
        }
        return valida;
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    salvar() {
        if (this.validar()) {
            this.element.curso = this.cursoSelecionado;
            this.cursoLivreService.salvarTurmaCursoLivre(this.element).subscribe(data => {
                if (data != null) {
                    this.id = data.id;
                    this.carregarTurma();
                    this.notificationService.addNotification('Sucesso!', 'A turma foi salva com sucesso.', NotificationType.Success);
                }
            });
        }
    }

    adicionarAluno() {
        const dialogRef = this.dialog.open(FormularioAlunoCursoLivreComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                const participacao = new ParticipacaoCursoLivre();
                participacao.turmaCursoLivreId = this.element.id;
                participacao.aluno = result;
                this.cursoLivreService.vincularAlunoCursoLivre(participacao).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Aluno adicionado.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }

    excluirAluno(participacao: ParticipacaoCursoLivre) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja remover o aluno da turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cursoLivreService.removerParticipacaoCursoLivre(participacao).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Aluno removido.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }
}
