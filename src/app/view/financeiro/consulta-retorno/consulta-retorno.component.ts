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
        this.pageList = new PageTableResult<RetornoArquivo>();
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


    paginar(pagina: number) {
        this.filtro.pagina = pagina;
        this.pesquisar();
    }
}
