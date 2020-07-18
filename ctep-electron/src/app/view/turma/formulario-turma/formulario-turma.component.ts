import { Component, OnInit } from '@angular/core';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { Turma } from '../../../../model/turma.model';
import { TurmaService } from '../../../../services/turma.service';
import { LoadingService } from '../../../custom-components/loading/loading.service';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-formulario-turma',
    templateUrl: './formulario-turma.component.html',
    styleUrls: ['./formulario-turma.component.scss']
})
export class FormularioTurmaComponent extends BaseFormularioComponent<Turma> implements OnInit {

    constructor(private turmaService: TurmaService,
                private loadingService: LoadingService,
                private notificationService: NotificationService,
                private router: Router) {
        super(turmaService, new Turma());
    }

    ngOnInit(): void {
    }


    validar(): boolean {
        return true;
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: null } }]);
    }
}
