import { Component, OnInit, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './modal-confirmacao.component.html'
})
export class ModalConfirmacaoComponent implements OnInit {
    mensagem: string;
    @Input() modalTemplate: TemplateRef<any>;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.mensagem = data.mensagem;
        this.modalTemplate = data.template;
    }

    ngOnInit() { }
}
