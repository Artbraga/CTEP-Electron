import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseFormularioComponent } from 'src/app/base/base-formulario.component';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { AlunoCursoLivre } from 'src/model/aluno-curso-livre.model';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { CursoLivreService } from 'src/services/curso-livre.service';

@Component({
    selector: 'app-formulario-aluno-curso-livre',
    templateUrl: './formulario-aluno-curso-livre.component.html',
    styleUrls: ['./formulario-aluno-curso-livre.component.scss']
})
export class FormularioAlunoCursoLivreComponent extends BaseFormularioComponent<AlunoCursoLivre> implements OnInit {
    masks = MaskPatterns;

    alunosOptions: AlunoCursoLivre[];
    alunoSelecionado: AlunoCursoLivre;
    editarAluno: boolean = false;

    constructor(private cursoLivreService: CursoLivreService,
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<FormularioAlunoCursoLivreComponent>) {
        super(new AlunoCursoLivre());
    }

    ngOnInit(): void {
    }

    get podeEditar(): boolean {
        return this.element.id == 0 || this.editarAluno;
    }


    pesquisar(value: string) {
        this.cursoLivreService.pesquisarAlunoCursoLivre(value).subscribe(data => {
            this.alunosOptions = data.map(x => Object.assign(new AlunoCursoLivre(), x));
        });
    }

    onSelect(aluno: AlunoCursoLivre) {
        if (aluno)
            this.element = aluno;
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.dialogRef.close(this.element);
            }
        } else {
            this.dialogRef.close();
        }
    }

    validar(): boolean {
        let valido = true;
        if (!this.stringValida(this.element.nome)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Nome é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.rg)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo RG é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cpf)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo CPF é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.testaCPF()) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O CPF digitado não é válido.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.endereco)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Endereço é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        return valido;
    }

    testaCPF() {
        let Soma = 0;
        if (this.element.cpf === undefined) {
            return false;
        }

        const strCPF = this.element.cpf.replace('.', '').replace('.', '').replace('-', '');
        if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
            strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' ||
            strCPF === '99999999999' || strCPF.length !== 11) {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }

        let Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        Soma = 0;
        for (let k = 1; k <= 10; k++) {
            Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k);
        }

        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(10, 11))) {
            return false;
        }

        return true;
    }
}
