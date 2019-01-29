import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { BaseConverter } from 'src/app/base/base-converter';

@Component({
    selector: 'perfil-aluno',
    templateUrl: './perfil-aluno.component.html',
})
export class PerfilAlunoComponent {

    @Output() bread = new EventEmitter<MenuItem>();
    @Input() element: Aluno;
    public loading: boolean = true;

    constructor() { }

    getStatus(status: number): string{
        return [{label: "Ativo", value:1 },
        {label: "Trancado", value:2 },
        {label: "Reprovado", value:3 },
        {label: "Concluído", value:4 }].find(x => x.value == status).label;
    }

    formatData(data: Date): string{
        return BaseConverter.convertDate(data);
    }
}
