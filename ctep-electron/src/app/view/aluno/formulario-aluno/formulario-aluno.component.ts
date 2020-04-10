import { Component, OnInit } from "@angular/core";
import { Aluno } from "src/model/aluno.model";
import { MaskPatterns } from "src/model/enums/mask.enum";
import { ViacepService } from "src/services/ngx-viacep/viacep.service";
import { Endereco } from "src/services/ngx-viacep/endereco";
import { LoadingService } from 'src/app/custom-components/loading/loading.service';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';

@Component({
    selector: "app-formulario-aluno",
    templateUrl: "./formulario-aluno.component.html",
    styleUrls: ["./formulario-aluno.component.scss"],
})
export class FormularioAlunoComponent implements OnInit {
    aluno: Aluno;
    masks = MaskPatterns;
    constructor(private cepService: ViacepService,
                private loadingService: LoadingService,
                private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.aluno = new Aluno();
    }

    buscarCep() {
        this.loadingService.addLoading();
        this.cepService.buscarPorCep(this.aluno.cep).then((x) => {
            this.loadingService.removeLoading();
            if (!x.hasOwnProperty("erro")) {
                this.notificationService.addNotification('CEP encontrado com sucesso!', '', NotificationType.Notification);
                let endereco = <Endereco>x;
                console.log(endereco);
                this.aluno.bairro = endereco.bairro;
                this.aluno.cidade = endereco.localidade;
                this.aluno.endereco = endereco.logradouro;
            } else {
                // this.element.bairro = null;
                // this.element.cidade = null;
                // this.element.endereco = null;
                // this.showFeedbackMessage({ severity:'error', summary:'CEP Incorreto', detail:'Endereço não encontrado para o CEP digitado.' });
            }
        });
    }
}
