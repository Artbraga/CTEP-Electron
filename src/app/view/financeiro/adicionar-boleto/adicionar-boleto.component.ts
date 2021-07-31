import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from 'src/app/base/base-formulario.component';
import { Coluna } from 'src/app/custom-components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/custom-components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { Aluno } from 'src/model/aluno.model';
import { Boleto } from 'src/model/boleto.model';
import { IdTurmaParameter, RotaVoltarParameter, FormularioTurmaRoute, NotasTurmaRoute } from 'src/model/enums/constants';
import { FiltroAluno } from 'src/model/filters/aluno.filter';
import { RegistroTurma } from 'src/model/registro-turma.model';
import { TurmaProfessor } from 'src/model/turma-professor.model';
import { Turma } from 'src/model/turma.model';
import { AlunoService } from 'src/services/aluno.service';
import { FinanceiroService } from 'src/services/financeiro.service';
import { RoutingService } from 'src/services/routing.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FinalizarTurmaComponent } from '../../turma/finalizar-turma/finalizar-turma.component';
import { RegistroTurmaComponent } from '../../turma/registro-turma/registro-turma.component';
import { TurmaProfessorComponent } from '../../turma/turma-professor/turma-professor.component';

@Component({
    selector: 'app-adicionar-boleto',
    templateUrl: './adicionar-boleto.component.html',
    styleUrls: ['./adicionar-boleto.component.scss']
})
export class AdicionarBoletoComponent extends BaseFormularioComponent<Boleto> implements OnInit {

    moneyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        requireDecimal: true
    });
    percentMask = createNumberMask({
        prefix: '',
        suffix: '%',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        requireDecimal: true
    });

    alunoSelecionado: Aluno;
    alunosOptions: Aluno[];

    columns: Coluna[] = [];

    numeroParcelas: number = 1;
    boletosGeracao: Boleto[];

    constructor(private alunoService: AlunoService,
                private financeiroService: FinanceiroService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Boleto());
    }

    ngOnInit(): void {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'aluno.nome' } as Coluna);
        this.columns.push({ key: 'seuNumero', header: 'Número', field: 'seuNumero' } as Coluna);
        this.columns.push({ key: 'vencimento', header: 'Vencimento', field: 'dataVencimentoStr' } as Coluna);
        this.columns.push({ key: 'valor', header: 'Valor', field: 'valorStr' } as Coluna);
    }

    pesquisarAluno(value: string) {
        const filtro = new FiltroAluno();
        filtro.nome = value;
        this.alunoService.pesquisarAlunos(filtro).subscribe(data => {
            this.alunosOptions = data.lista.map(x => Object.assign(new Aluno(), x));
        });
    }

    validar(): boolean {
        let valida = true;
        if (this.alunoSelecionado == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário selecionar um aluno para associar os boletos.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.seuNumero)) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher o número base dos boletos.', NotificationType.Error);
        }
        if (this.numeroParcelas == null || this.numeroParcelas <= 0) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'Digite um número válido para a quantidade de boletos.', NotificationType.Error);
        }
        if (this.element.dataVencimento == null) {
            valida = false;
            this.notificationService.addNotification('Erro!', 'É necessário preencher a data de vencimento base do parcelamento.', NotificationType.Error);
        }
        return valida;
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    limpar() {
        this.element = new Boleto();
        this.numeroParcelas = 1;
    }

    salvar() {
        if (this.validar()) {
            this.financeiroService.verificarExistenciaBoletos()
        }
    }

    excluirProfessor(professor: TurmaProfessor) {
        // const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
        //     data: { mensagem: `Deseja remover o professor da turma?` }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.turmaService.excluirProfessor(professor.id).subscribe(data => {
        //             if (data) {
        //                 this.notificationService.addNotification('Sucesso!', 'Professor removido.', NotificationType.Success);
        //                 this.carregarProfessoresDaTurma();
        //             }
        //         });
        //     }
        // });
    }
}