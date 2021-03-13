import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { Turma } from "src/model/turma.model";
import { TurmaService } from "src/services/turma.service";

@Component({
    selector: "app-finalizar-turma",
    templateUrl: "./finalizar-turma.component.html",
    styleUrls: ["./finalizar-turma.component.scss"],
})
export class FinalizarTurmaComponent {
    constructor(private turmaService: TurmaService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<FinalizarTurmaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Turma) {}

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.data.dataFim == null) {
                this.notificationService.addNotification('Erro!', 'É necessário inserir uma data para finalizar a turma.', NotificationType.Error);

            } else if (this.data.dataInicio > this.data.dataFim) {
                this.notificationService.addNotification('Erro!', 'A data de fim deve ser posterior a data de início da turma.', NotificationType.Error);
            }
            else {
                this.turmaService.finalizarTurma(this.data).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Turma finalizada com sucesso.', NotificationType.Success);
                        this.dialogRef.close(true);
                    }
                });
            }
        } else {
            this.dialogRef.close(false);
        }
    }

}
