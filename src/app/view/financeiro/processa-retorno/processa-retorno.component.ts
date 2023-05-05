import { Component, OnInit } from '@angular/core';
import { Coluna } from 'src/app/custom-components/base-table';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { RegistroRetorno } from 'src/model/registro-retorno.model';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';
import { FinanceiroService } from 'src/services/financeiro.service';

@Component({
    selector: 'app-processa-retorno',
    templateUrl: './processa-retorno.component.html',
    styleUrls: ['./processa-retorno.component.scss']
})
export class ProcessaRetornoComponent implements OnInit {

    arquivos: File[] = [];
    retornos: RetornoArquivo[] = [];
    registrosProcessados: RegistroRetorno[];
    readonly columns: Coluna[] = [];

    constructor(private financeiroService: FinanceiroService,
                private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.columns.push({ key: 'nome', header: 'Nome', field: 'aluno.nome' } as Coluna);
        this.columns.push({ key: 'seuNumero', header: 'Número', field: 'seuNumero' } as Coluna);
        this.columns.push({ key: 'vencimento', header: 'Vencimento', field: 'dataVencimentoStr' } as Coluna);
        this.columns.push({ key: 'valor', header: 'Valor', field: 'valorStr' } as Coluna);
        this.columns.push({ key: 'pagamento', header: 'Data do Pagamento', field: 'dataPagamentoStr' } as Coluna);
        this.columns.push({ key: 'valorPago', header: 'Valor Pago', field: 'valorPagoStr' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'status' } as Coluna);
    }

    onFileSelected(event) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            for(let i = 0; i < files.length; i++) {
                let f = files[i];
                if (!this.arquivos.some(x => x.name == f.name)){
                    this.arquivos.push(f);
                }
            }
            this.arquivos.sort((a, b) => a.name < b.name ? 1 : -1);
        }
    }

    removeAnexo = (arquivo: File) => this.arquivos = this.arquivos.filter(a => a != arquivo);

    limparAnexos = () => this.arquivos = [];

    processar() {
        this.financeiroService.lerArquivos(this.arquivos).subscribe(data => {
            this.retornos = [];
            data.forEach(x => {
                if (x.possuiErro) {
                    this.notificationService.addNotification("Retorno", x.mensagem, NotificationType.Error);
                }
                let ret = Object.assign(new RetornoArquivo(), x.objetoTratado);
                ret.corrigirInformacoes();
                this.retornos.push(ret);
            })
            this.retornos.sort((a, b) => a.dataReferencia > b.dataReferencia ? 1 : -1);
        });
    }

    tratarString(str: string): string {
        if (str != null && str != '') {
            return str.toString();
        }
        return '---';
    }

    cancelar() {
        this.arquivos = [];
        this.retornos = [];
    }

    removerRetorno(ret: RetornoArquivo) {
        this.retornos = this.retornos.filter(x => x !== ret);
        if (this.retornos.length == 0) this.cancelar();
    }

    salvar() {
        this.financeiroService.processarMovimentacoes(this.retornos).subscribe(data => {
            console.log(data)
        });
    }
}
