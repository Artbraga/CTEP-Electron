import { Component } from '@angular/core';
import { Aluno } from 'src/model/aluno.model';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { ViacepService } from 'src/services/ngx-viacep/viacep.service';
import { Endereco } from 'src/services/ngx-viacep/endereco';
import { LoadingService } from 'src/app/custom-components/loading/loading.service';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { AlunoService } from '../../../../services/aluno.service';

@Component({
    selector: 'app-formulario-aluno',
    templateUrl: './formulario-aluno.component.html',
    styleUrls: ['./formulario-aluno.component.scss'],
})
export class FormularioAlunoComponent extends BaseFormularioComponent<Aluno> {

    masks = MaskPatterns;
    constructor(private alunoService: AlunoService,
                private cepService: ViacepService,
                private loadingService: LoadingService,
                private notificationService: NotificationService,
                private router: Router) {
        super(alunoService, new Aluno());
    }

    validar(): boolean {
        return true;
    }

    buscarCep() {
        this.loadingService.addLoading();
        this.cepService.buscarPorCep(this. element.cep).then((x) => {
            this.loadingService.removeLoading();
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
}
