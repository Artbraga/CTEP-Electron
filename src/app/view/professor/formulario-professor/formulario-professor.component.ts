import { Component, OnInit } from "@angular/core";
import { BaseFormularioComponent } from "src/app/base/base-formulario.component";
import { NotificationService } from "src/app/custom-components/notification/notification.service";
import { NotificationType } from "src/app/custom-components/notification/toaster/toaster";
import { FichaAlunoParameter, IdAlunoParameter, RotaVoltarParameter, PesquisarAlunoParameter, IdProfessorParameter } from "src/model/enums/constants";
import { MaskPatterns } from "src/model/enums/mask.enum";
import { Professor } from "src/model/professor.model";
import { Endereco } from "src/services/application-services/ngx-viacep/endereco";
import { ViacepService } from "src/services/application-services/ngx-viacep/viacep.service";
import { ProfessorService } from "src/services/professor.service";
import { RoutingService } from "src/services/routing.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "app-formulario-professor",
    templateUrl: "./formulario-professor.component.html",
    styleUrls: ["./formulario-professor.component.scss"],
})
export class FormularioProfessorComponent extends BaseFormularioComponent<Professor> implements OnInit {

    masks = MaskPatterns;
    rotaVoltar: string = null;

    constructor(private professorService: ProfessorService,
                private cepService: ViacepService,
                private notificationService: NotificationService,
                private routingService: RoutingService,
                private router: Router,
                public dialog: MatDialog) {
                super(new Professor());
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdProfessorParameter)) {
            this.isEdicao = true;
            const id = this.routingService.excluirValor(IdProfessorParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.professorService.getById(id).subscribe(data => {
                this.carregarProfessor(data);
            });
        }
    }

    validar(): boolean {
        let valido = true;
        if (!this.stringValida(this.element.nome)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Nome é obrigatório para cadastrar um professor.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cpf)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo CPF é obrigatório para cadastrar um professor.', NotificationType.Error);
        }
        if (!this.testaCPF()) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O CPF digitado não é válido.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cep)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo CEP é obrigatório para cadastrar um professor.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.endereco)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Endereço é obrigatório para cadastrar um professor.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.formacao)) {
            valido = false;
            this.notificationService.addNotification('Erro!', 'O campo Formação é obrigatório para cadastrar um professor.', NotificationType.Error);
        }
        return valido;

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

    salvar() {
        if (this.validar()) {
            this.professorService.salvar(this.element).subscribe(data => {
                this.notificationService.addNotification('Sucesso!', 'O professor foi salvo com sucesso.', NotificationType.Success);
                this.isEdicao = true;
                this.carregarProfessor(data);
            });
        }
    }
    carregarProfessor(professor: Professor) {
        this.element = Object.assign(new Professor(), professor);
    }

    limparCampos() {
        this.isEdicao = false;
        this.element = new Professor();
    }


    voltar() {
        if (this.rotaVoltar == FichaAlunoParameter) {
            this.routingService.salvarValor(IdAlunoParameter, this.element.id);
            this.routingService.salvarValor(RotaVoltarParameter, PesquisarAlunoParameter);
        }
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
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
