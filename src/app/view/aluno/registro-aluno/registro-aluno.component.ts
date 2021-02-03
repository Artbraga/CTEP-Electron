import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormularioComponent } from "src/app/base/base-formulario.component";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { Aluno } from "src/model/aluno.model";
import { RegistroAluno } from "src/model/registro-aluno.model";

@Component({
    selector: "app-registro-aluno",
    templateUrl: "./registro-aluno.component.html",
    styleUrls: ["./registro-aluno.component.scss"],
})
export class RegistroAlunoComponent
    extends BaseFormularioComponent<RegistroAluno>
    implements OnInit {
    constructor(
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<RegistroAlunoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Aluno
    ) {
        super(new RegistroAluno());
        this.element.data = new Date();
    }

    ngOnInit(): void {}

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.element.alunoId = this.data.id;
                this.dialogRef.close(this.element);
            } else {
                this.notificationService.addNotification(
                    "Erro!",
                    "Registro de aluno não pode ser salvo vazio.",
                    NotificationType.Error
                );
            }
        } else {
            this.dialogRef.close(null);
        }
    }

    validar(): boolean {
        return this.stringValida(this.element.registro);
    }
}
