import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BaseFormularioComponent } from "src/app/base/base-formulario.component";
import { Coluna } from "src/app/custom-components/base-table";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { Aluno } from "src/model/aluno.model";
import { Boleto } from "src/model/boleto.model";
import { FiltroAluno } from "src/model/filters/aluno.filter";
import { AlunoService } from "src/services/aluno.service";
import { FinanceiroService } from "src/services/financeiro.service";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

@Component({
    selector: "app-adicionar-boleto",
    templateUrl: "./adicionar-boleto.component.html",
    styleUrls: ["./adicionar-boleto.component.scss"],
})
export class AdicionarBoletoComponent
    extends BaseFormularioComponent<Boleto>
    implements OnInit
{
    moneyMask = createNumberMask({
        prefix: "R$ ",
        suffix: "",
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
        requireDecimal: true,
    });
    percentMask = createNumberMask({
        prefix: "",
        suffix: "%",
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
        requireDecimal: true,
    });

    alunoSelecionado: Aluno;
    alunosOptions: Aluno[];

    columns: Coluna[] = [];

    numeroParcelas: number = 1;
    boletosGeracao: Boleto[];
    mostrarParcelamento: boolean;

    constructor(
        private alunoService: AlunoService,
        private financeiroService: FinanceiroService,
        private notificationService: NotificationService,
        private router: Router,
        public dialog: MatDialog
    ) {
        super(new Boleto());
    }

    ngOnInit(): void {
        this.columns.push({
            key: "nome",
            header: "Nome",
            field: "aluno.nome",
        } as Coluna);
        this.columns.push({
            key: "seuNumero",
            header: "Número",
            field: "seuNumero",
        } as Coluna);
        this.columns.push({
            key: "vencimento",
            header: "Vencimento",
            field: "dataVencimentoStr",
        } as Coluna);
        this.columns.push({
            key: "valor",
            header: "Valor",
            field: "valorStr",
        } as Coluna);
        this.columns.push({
            key: "multa",
            header: "Multa",
            field: "percentualMultaStr",
        } as Coluna);
        this.columns.push({
            key: "juros",
            header: "Juros",
            field: "valorJurosStr",
        } as Coluna);
    }

    pesquisarAluno(value: string) {
        const filtro = new FiltroAluno();
        filtro.nome = value;
        this.alunoService.pesquisarAlunos(filtro).subscribe((data) => {
            this.alunosOptions = data.lista.map((x) =>
                Object.assign(new Aluno(), x)
            );
        });
    }

    validar(): boolean {
        let valida = true;
        if (this.alunoSelecionado == null) {
            valida = false;
            this.notificationService.addNotification(
                "Erro!",
                "É necessário selecionar um aluno para associar os boletos.",
                NotificationType.Error
            );
        }
        if (!this.stringValida(this.element.seuNumero)) {
            valida = false;
            this.notificationService.addNotification(
                "Erro!",
                "É necessário preencher o número base dos boletos.",
                NotificationType.Error
            );
        }
        if (this.numeroParcelas == null || this.numeroParcelas <= 0) {
            valida = false;
            this.notificationService.addNotification(
                "Erro!",
                "Digite um número válido para a quantidade de boletos.",
                NotificationType.Error
            );
        }
        if (this.element.dataVencimento == null) {
            valida = false;
            this.notificationService.addNotification(
                "Erro!",
                "É necessário preencher a data de vencimento base do parcelamento.",
                NotificationType.Error
            );
        }
        return valida;
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    limpar() {
        this.element = new Boleto();
        this.alunoSelecionado = null;
        this.numeroParcelas = 1;
        this.mostrarParcelamento = false;
        this.boletosGeracao = [];
    }

    gerarParcelas() {
        this.mostrarParcelamento = false;
        if (this.validar()) {
            this.financeiroService
                .verificarExistenciaBoletos(
                    this.element.seuNumero,
                    this.numeroParcelas
                )
                .subscribe((data) => {
                    if (data) {
                        this.notificationService.addNotification(
                            "Erro!",
                            "Já existem boletos cadastrados com o número informado.",
                            NotificationType.Error
                        );
                        return;
                    }
                    this.mostrarParcelamento = true;
                    this.boletosGeracao = [];
                    for (let i = 1; i <= this.numeroParcelas; i++) {
                        const novoBoleto = new Boleto();
                        novoBoleto.seuNumero = `${this.element.seuNumero}/${
                            i < 10 ? "0" : ""
                        }${i}`;
                        novoBoleto.aluno = this.alunoSelecionado;
                        const novaData = new Date(this.element.dataVencimento);
                        novaData.setMonth(novaData.getMonth() + i - 1);
                        novoBoleto.dataVencimento = novaData;
                        novoBoleto.valor = this.lerValor(
                            this.element.valor.toString()
                        );
                        novoBoleto.valorJuros = this.lerValor(
                            this.element.valorJuros?.toString() || "0"
                        );
                        novoBoleto.percentualMulta = this.lerValor(
                            this.element.percentualMulta?.toString() || "0"
                        );
                        novoBoleto.dataEmissao = new Date();
                        this.boletosGeracao.push(novoBoleto);
                    }
                });
        }
    }

    salvar() {
        this.financeiroService
            .salvarBoletos(this.boletosGeracao)
            .subscribe((data) => {
                this.notificationService.addNotification(
                    "Sucesso!",
                    "Boletos salvos com sucesso!.",
                    NotificationType.Success
                );
                this.limpar();
            });
    }

    lerValor(valor: string): number {
        return Number.parseFloat(
            valor.replace("R$ ", "").replace("%", "").replace(",", ".")
        );
    }
}
