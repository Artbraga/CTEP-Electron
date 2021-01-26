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
import { RoutingService } from 'src/services/routing.service';
import { IdAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';

@Component({
    selector: 'app-formulario-aluno',
    templateUrl: './formulario-aluno.component.html',
    styleUrls: ['./formulario-aluno.component.scss'],
})
export class FormularioAlunoComponent extends BaseFormularioComponent<Aluno> implements OnInit {

    masks = MaskPatterns;
    imagem: any;
    imagemPerfil: File;
    imagemMudou = false;
    rotaVoltar: string = null;

    constructor(private alunoService: AlunoService,
                private cepService: ViacepService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
        super(new Aluno());
    }

    ngOnInit() {
        this.limparCampos();
        if (this.routingService.possuiValor(IdAlunoParameter)) {
            this.isEdicao = true;
            const id = this.routingService.excluirValor(IdAlunoParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.alunoService.getById(id).subscribe(data => {
                this.element = Object.assign(new Aluno(), data);
                this.element.corrigirInformacoes();
            });
            this.alunoService.buscarImagem(id).subscribe(data => {
                if (data != null && data.size > 0) {
                    const blob = new Blob([data], { type: 'image/png' });
                    const reader = new FileReader();

                    reader.addEventListener('load', (event: any) => {
                        this.imagem = event.target.result;
                    });
                    reader.readAsDataURL(blob);
                }
            });
        }
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


    inserirFoto(imageInput: any) {
        this.imagemPerfil = imageInput.files[0];
        this.imagemMudou = true;
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.imagem = event.target.result;
        });
        reader.readAsDataURL(this.imagemPerfil);
    }

    removerFoto() {
        this.imagem = null;
        this.imagemPerfil = null;
        this.imagemMudou = true;
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
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    salvar() {
        if (this.validar()) {
            this.alunoService.salvar(this.element).subscribe(data => {
                this.verificarVincularTurma(data);
                this.notificationService.addNotification('Sucesso!', 'O aluno foi salvo com sucesso.', NotificationType.Success);
                if (this.imagemMudou) {
                    this.alunoService.salvarImagem(data.id, this.imagemPerfil).subscribe(x => {
                        if (x) {
                            this.notificationService.addNotification('Sucesso!', 'Foto de perfil salva com sucesso.', NotificationType.Success);
                        } else {
                            this.notificationService.addNotification('Erro!', 'Erro ao salvar foto de perfil.', NotificationType.Error);
                        }
                    });
                }
            });
        }
    }

    limparCampos() {
        this.isEdicao = false;
        this.imagem = null;
        this.imagemMudou = false;
        this.imagemPerfil = null;
        this.element = new Aluno();
        this.element.dataMatricula = new Date();
    }

    verificarVincularTurma(aluno: Aluno) {
        if (!this.isEdicao) {
            const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
                data: { mensagem: `Deseja vincular o aluno ${aluno.nome} em uma turma?` }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.dialog.open(TurmaAlunoComponent, { data: aluno });
                }
                this.limparCampos();
            });
        }
    }
}
