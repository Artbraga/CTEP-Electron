import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { BaseTable } from "src/app/base/baseTable";
import { AlunoService } from "src/app/service/aluno.service";

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