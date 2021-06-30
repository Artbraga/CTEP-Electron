import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from 'src/app/custom-components/custom-select/custom-select.component';
import { TipoStatusBoletoEnum } from 'src/model/enums/tipo-status-boleto.enum';
import { FiltroBoleto } from 'src/model/filters/boleto.filter';

@Component({
    selector: 'filtro-boleto',
    templateUrl: './filtro-boleto.component.html',
    styleUrls: ['./filtro-boleto.component.scss']
})
export class FiltroBoletoComponent implements AfterViewInit {

    @Output() pesquisar = new EventEmitter<FiltroBoleto>();

    @Input() filtro: FiltroBoleto;

    tiposStatusBoletoOptions: SelectItem<number>[];
    tiposStatusBoletoSelecionados: SelectItem<number>[];

    constructor() { }

    ngAfterViewInit(): void {
        this.tiposStatusBoletoOptions = TipoStatusBoletoEnum.List();
    }

    pesquisarBoletos() {
        this.filtro.statusId = this.tiposStatusBoletoSelecionados.map(x => x.value);
        this.pesquisar.emit(this.filtro);
    }


    limpar() {
        this.filtro = new FiltroBoleto();
        this.tiposStatusBoletoSelecionados = [];
    }
}
