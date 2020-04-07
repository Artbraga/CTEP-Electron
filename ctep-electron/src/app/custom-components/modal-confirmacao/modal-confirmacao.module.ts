import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalConfirmacaoComponent } from './modal-confirmacao.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

@NgModule({
    declarations: [ModalConfirmacaoComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [ModalConfirmacaoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ModalConfirmacaoModule { }
