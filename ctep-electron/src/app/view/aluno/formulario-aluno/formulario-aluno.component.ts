import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/model/aluno.model';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { ViacepService } from 'src/services/ngx-viacep/viacep.service';
import { Endereco } from 'src/services/ngx-viacep/endereco';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { AlunoService } from '../../../../services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';

@Component({
    selector: 'app-formulario-aluno',
    templateUrl: './formulario-aluno.component.html',
    styleUrls: ['./formulario-aluno.component.scss'],
})
export class FormularioAlunoComponent extends BaseFormularioComponent<Aluno> implements OnInit {

    masks = MaskPatterns;
    imagem: any;

    constructor(private alunoService: AlunoService,
                private cepService: ViacepService,
                private notificationService: NotificationService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Aluno());
    }

    ngOnInit() {

        this.element.dataMatricula = new Date();
    }

    validar(): boolean {
        let valido = true;
        if (!this.stringValida(this.element.nome)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Nome é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cpf)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo CPF é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.testaCPF()) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O CPF digitado não é válido.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cep)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo CEP é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.endereco)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Endereço é obrigatório para cadastrar um aluno.', NotificationType.Error);
        }
        return valido;
    }

    testaCPF() {
        var Soma = 0;
        if (this.element.cpf === undefined) {
            return false;
        }

        var strCPF = this.element.cpf.replace('.', '').replace('.', '').replace('-', '');
        if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
        strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' ||
        strCPF === '99999999999' || strCPF.length !== 11) {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }

        var Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        Soma = 0;
        for (let k = 1; k <= 10; k++) {
            Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
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


    inserirFoto(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.imagem = event.target.result;
        });
        reader.readAsDataURL(file);
      }

    buscarCep() {
        this.cepService.buscarPorCep(this. element.cep).then((x) => {
            if (!x.hasOwnProperty('erro')) {
                this.notificationService.addNotification('Sucesso!', 'CEP encontrado com sucesso!', NotificationType.Notification);
                const endereco = x as Endereco;
                this.element.bairro = endereco.bairro;
                this.element.cidade = endereco.localidade;
                this.element.endereco = endereco.logradouro;
            } else {
                this.element.bairro = null;
                this.element.cidade = null;
                this.element.endereco = null;
                this.notificationService.addNotification('Erro!', 'Endereço não encontrado para o CEP digitado.', NotificationType.Error);
            }
        });
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: null } }]);
    }

    salvar() {
        if (this.validar()) {
            this.alunoService.salvar(this.element).subscribe(data => {
                this.verificarVincularTurma(data);
                this.notificationService.addNotification('Sucesso!', 'O aluno foi salvo com sucesso.', NotificationType.Success);
            });
        }
    }

    verificarVincularTurma(aluno: Aluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja vincular o aluno ${aluno.nome} em uma turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TurmaAlunoComponent, {
                    data: aluno
                });
            }
        });
    }
}
