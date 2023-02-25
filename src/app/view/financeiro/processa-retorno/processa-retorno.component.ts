import { Component, OnInit } from '@angular/core';
import { Coluna } from 'src/app/custom-components/base-table';
import { Boleto } from 'src/model/boleto.model';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';
import { FinanceiroService } from 'src/services/financeiro.service';

@Component({
    selector: 'app-processa-retorno',
    templateUrl: './processa-retorno.component.html',
    styleUrls: ['./processa-retorno.component.scss']
})
export class ProcessaRetornoComponent implements OnInit {

    arquivos: File[] = [];
    retornos: RetornoArquivo[];
    columns: Coluna[] = [];

    constructor(private financeiroService: FinanceiroService) { }

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
            this.retornos = data.map(x => {
                let ret = Object.assign(new RetornoArquivo(), x)
                ret.corrigirInformacoes();
                return ret;
            });
        });
    }
}
