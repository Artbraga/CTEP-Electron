import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { BaseTable } from "../../../base/baseTable";
import { AlunoService } from "../../../service/aluno.service";

@Component({
    selector: 'table-listar-aluno',
    templateUrl: './table-listar-aluno.component.html',
})
export class TableListarAlunoComponent extends BaseTable implements OnInit {
    
    constructor(alunoService: AlunoService, ref: ChangeDetectorRef){
        super(alunoService, ref);
    }


    ngOnInit(): void {
        this.colunas = [
            { field: 'matricula', header: 'Matricula', style: {'width':'120px'}},
            { field: 'nome', header: 'Nome' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'celular', header: 'Celular' },
            { field: 'turma.codigo', header: 'Turma' },
        ];
    }

    
}