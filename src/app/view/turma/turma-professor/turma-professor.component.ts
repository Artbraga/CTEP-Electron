import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormularioComponent } from "src/app/base/base-formulario.component";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { Professor } from "src/model/professor.model";
import { TurmaProfessor } from "src/model/turma-professor.model";
import { Turma } from "src/model/turma.model";
import { ProfessorService } from "src/services/professor.service";

@Component({
    selector: "app-turma-professor",
    templateUrl: "./turma-professor.component.html",
    styleUrls: ["./turma-professor.component.scss"],
})
export class TurmaProfessorComponent extends BaseFormularioComponent<TurmaProfessor> implements OnInit {

    professoressOptions: Professor[];
    professorSelecionado: Professor;

    constructor(private professorService: ProfessorService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<TurmaProfessorComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Turma
    ) {
        super(new TurmaProfessor());
    }

    ngOnInit(): void {
        this.professorService.listarProfessoresAtivos().subscribe(data => {
            this.professoressOptions = data.filter(x => !this.data.professores.some(y => y.professor.id == x.id))
                .map(x => Object.assign(new Professor(), x));
        });
    }

    validar(): boolean {
        let valido = true;
        if (this.professorSelecionado == null) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'É necessário selecionar um professor para a turma.', NotificationType.Error);
        }
        return valido;
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.element.professor = this.professorSelecionado;
                this.element.turmaId = this.data.id;
                this.dialogRef.close(this.element);
            }
        } else {
            this.dialogRef.close();
        }
    }

}
