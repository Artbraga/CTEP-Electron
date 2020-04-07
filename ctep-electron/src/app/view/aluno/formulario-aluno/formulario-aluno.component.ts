import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../model/aluno.model';
import { MaskPatterns } from '../../../model/enums/mask.enum';

@Component({
    selector: 'app-formulario-aluno',
    templateUrl: './formulario-aluno.component.html',
    styleUrls: ['./formulario-aluno.component.scss']
})
export class FormularioAlunoComponent implements OnInit {

    aluno: Aluno;
    masks = MaskPatterns;
    constructor() { }

    ngOnInit(): void {
        this.aluno = new Aluno();
    }

}
