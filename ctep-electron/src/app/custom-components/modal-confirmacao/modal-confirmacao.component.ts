import { Component, OnInit, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './modal-confirmacao.component.html',
    styleUrls: ['modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {
    mensagem: string;
    tipoModal: string = "Confirmacao";
    @Input() modalTemplate: TemplateRef<any>;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.mensagem = data.mensagem;
        this.modalTemplate = data.template;
        this.tipoModal = data.tipoModal ? data.tipoModal: "Confirmacao";
    }

    ngOnInit() { }

    showClearBtn() {
        return this.tipoModal != "Alerta"
    }
}
