import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../model/aluno.model';
import { MaskPatterns } from '../../../../model/enums/mask.enum';

@Component({
    selector: 'app-formulario-turma',
    templateUrl: './formulario-turma.component.html',
    styleUrls: ['./formulario-turma.component.scss']
})
export class FormularioTurmaComponent implements OnInit {

    aluno: Aluno;
    masks = MaskPatterns;
    constructor() { }

    ngOnInit(): void {
        this.aluno = new Aluno();
    }

}
