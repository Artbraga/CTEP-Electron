import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormularioComponent } from 'src/app/base/base-formulario.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { RegistroTurma } from 'src/model/registro-turma.model';
import { Turma } from 'src/model/turma.model';

@Component({
    selector: "registro-turma",
    templateUrl: "./registro-turma.component.html",
    styleUrls: ["./registro-turma.component.scss"],
})
export class RegistroTurmaComponent extends BaseFormularioComponent<RegistroTurma> implements OnInit {

    constructor(private notificationService: NotificationService,
                private dialogRef: MatDialogRef<RegistroTurmaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Turma) {
        super(new RegistroTurma());
        this.element.data = new Date();
    }

    ngOnInit(): void {}

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.element.turmaId = this.data.id;
                this.dialogRef.close(this.element);
            }
            else {
                this.notificationService.addNotification('Erro!', 'Registro de turma não pode ser salvo vazio.', NotificationType.Error)
            }
        }
        else {
            this.dialogRef.close(null);
        }
    }

    validar(): boolean {
        return this.stringValida(this.element.registro);
    }
}
