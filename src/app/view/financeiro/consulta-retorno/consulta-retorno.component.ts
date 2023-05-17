import { Component, OnInit } from '@angular/core';
import { PageTableResult } from 'src/app/custom-components/page-table-result';
import { FiltroRetorno } from 'src/model/filters/retorno.filter';
import { RetornoArquivo } from 'src/model/retorno-arquivo.model';
import { FinanceiroService } from 'src/services/financeiro.service';

@Component({
    selector: 'app-consulta-retorno',
    templateUrl: './consulta-retorno.component.html',
    styleUrls: ['./consulta-retorno.component.scss']
})
export class ConsultaRetornoComponent implements OnInit {

    filtro: FiltroRetorno;
    pageList: PageTableResult<RetornoArquivo>;
    constructor(private financeiroService: FinanceiroService) {
        this.filtro = new FiltroRetorno();
    }

    ngOnInit(): void {
        this.pesquisar();
    }

    pesquisar() {
        this.financeiroService.listarRetornos(this.filtro).subscribe(data => {
            this.pageList = data;
            this.pageList.lista = data.lista.map(x => {
                const retorno = Object.assign(new RetornoArquivo(), x);
                retorno.corrigirInformacoes();
                return retorno;
            });
        });
    }

    exportarPesquisa() {
        // if (this.pageList.lista == null || this.pageList.lista.length == 0) {
        //     this.notificationService.addNotification('Atenção', 'A pesquisa não possui resultados a serem exportados.', NotificationType.Warnning);
        //     return;
        // }

        // this.alunoService.baixarPesquisa(this.filtro).subscribe(data => {
        //     if (data) {
        //         this.baixarArquivoService.downloadFile(data, 'exportação.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        //     }
        // },
        //     err => {
        //         this.notificationService.addNotification('Erro', 'Erro ao baixar a pesquisa!', NotificationType.Error);
        //     });
    }

    paginar(pagina: number) {
        this.filtro.pagina = pagina;
        this.pesquisar();
    }
}
